import {useRef,useState} from 'react';import {motion,AnimatePresence} from 'framer-motion';import {burst} from './Effects.jsx';
const CX=[155,180,220,245];
const Flower=({x,y})=><g transform={`translate(${x} ${y})`}>{[0,72,144,216,288].map(a=><circle key={a} cx={Math.cos(a/57.3)*7} cy={Math.sin(a/57.3)*7} r="6" fill="#fff" stroke="#ffb3cf" strokeWidth=".8"/>)}<circle r="4" fill="#ffd36b"/></g>;
const Berry=({x,y})=><g transform={`translate(${x} ${y})`}><path d="M-11 -4Q0 -8 11 -4Q8 12 0 15Q-8 12 -11 -4Z" fill="#e8344f"/><path d="M-11 -4Q0 -8 11 -4Q8 6 0 8Q-8 6 -11 -4Z" fill="#fff" opacity=".15"/>{[[-4,2],[3,4],[0,9],[5,-1]].map(([a,b],i)=><circle key={i} cx={a} cy={b} r="1" fill="#ffe0a0"/>)}<path d="M-7 -5L0 -11L7 -5L0 -3Z" fill="#4caf6a"/></g>;
function Body({lit}){return <g>
 <ellipse cx="200" cy="335" rx="175" ry="20" fill="#000" opacity=".12"/>
 <ellipse cx="200" cy="326" rx="170" ry="20" fill="url(#plate)"/>
 <rect x="60" y="250" width="280" height="76" rx="16" fill="#ffd9e6"/>
 <rect x="56" y="244" width="288" height="26" rx="13" fill="#fff"/>
 {[80,120,160,200,240,280,320].map(x=><circle key={x} cx={x} cy="271" r="11" fill="#fff"/>)}
 <rect x="60" y="298" width="280" height="10" fill="#ffb3cf" opacity=".6"/>
 <rect x="60" y="250" width="280" height="76" rx="16" fill="url(#shade)"/>
 <rect x="100" y="178" width="200" height="72" rx="14" fill="#ffc2d9"/>
 <rect x="96" y="170" width="208" height="24" rx="12" fill="#fff"/>
 {[120,160,200,240,280].map(x=><circle key={x} cx={x} cy="194" r="9" fill="#fff"/>)}
 <rect x="100" y="178" width="200" height="72" rx="14" fill="url(#shade)"/>
 <Berry x="80" y="244"/><Berry x="320" y="244"/><Berry x="125" y="170"/><Berry x="275" y="170"/><Berry x="200" y="240"/>
 <Flower x="108" y="248"/><Flower x="290" y="248"/><Flower x="160" y="246"/><Flower x="240" y="246"/><Flower x="150" y="174"/><Flower x="250" y="174"/>
 <rect x="140" y="124" width="120" height="52" rx="12" fill="#ffe3ee"/><rect x="136" y="118" width="128" height="20" rx="10" fill="#fff"/><rect x="140" y="164" width="120" height="4" fill="#e8c27a"/><rect x="140" y="124" width="120" height="52" rx="12" fill="url(#shade)"/>
 <text x="200" y="160" textAnchor="middle" fontSize="34" fontFamily="Playfair Display,serif" fontWeight="700" fill="url(#gold)" stroke="#fff" strokeWidth="1">20</text>
 <g transform="translate(0 -52)">{CX.map(x=><g key={x}><rect x={x-5} y="128" width="10" height="44" rx="3" fill="#fff" stroke="#ffb3cf"/><path d={`M${x-5} 140l10 6M${x-5} 150l10 6M${x-5} 160l10 6`} stroke="#ff8fb8" strokeWidth="3"/>
  <rect x={x-.7} y="121" width="1.4" height="8" fill="#444"/>
  {lit&&<g className="flame"><ellipse cx={x} cy="112" rx="11" ry="16" fill="#ffd36b" opacity=".35" filter="url(#blur)"/><path d={`M${x} 100Q${x+6} 112 ${x} 121Q${x-6} 112 ${x} 100Z`} fill="#ffb02e"/><ellipse cx={x} cy="115" rx="2.5" ry="5" fill="#fff6c8"/></g>}</g>)}</g>
</g>}
export default function Cake(){
 const [st,setSt]=useState('idle');const ref=useRef();
 const lit=st==='wish';
 const blow=()=>{const r=ref.current.getBoundingClientRect(),k=r.width/400;
  CX.forEach(x=>burst({x:r.left+x*k,y:r.top+110*k,n:14,kind:'smoke'}));setSt('out')};
 const done=()=>{const r=ref.current.getBoundingClientRect();const o={x:r.left+r.width/2,y:r.top+r.height*.7};
  burst({...o,n:140});burst({...o,n:50,kind:'crumb'});burst({...o,n:50,kind:'sparkle'});setSt('cut')};
 const msg={idle:'',wish:'Close Your Eyes. Make a Beautiful Wish.',out:'May all your wishes come true! 💗',cutting:'',cut:'May Every Sweet Wish Come True!'}[st];
 const half=(id,dx,rot)=><motion.g clipPath={`url(#${id})`} initial={{x:0,rotate:0}} animate={{x:dx,rotate:rot}} transition={{type:'spring',stiffness:60,damping:12}} style={{transformOrigin:'200px 330px'}}><Body lit={false}/></motion.g>;
 return <div className="cakewrap">
  <svg ref={ref} viewBox="0 -50 400 410" className="cake">
   <defs>
    <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".12"/><stop offset=".35" stopColor="#fff" stopOpacity=".18"/><stop offset="1" stopColor="#000" stopOpacity=".2"/></linearGradient>
    <linearGradient id="plate" x1="0" x2="1"><stop offset="0" stopColor="#f0d6a8"/><stop offset=".5" stopColor="#fff3d8"/><stop offset="1" stopColor="#e5c48f"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9a0"/><stop offset="1" stopColor="#d9a441"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="4"/></filter>
    <clipPath id="L"><rect x="0" y="0" width="200" height="400"/></clipPath><clipPath id="R"><rect x="200" y="0" width="200" height="400"/></clipPath>
   </defs>
   {st==='cut'?<>{half('L',-38,-4)}{half('R',38,4)}</>:<Body lit={lit}/>}
   {st==='cut'&&<><motion.rect x="162" y="172" width="38" height="154" fill="#fff3d8" initial={{opacity:0}} animate={{opacity:.0}}/></>}
   {st==='cutting'&&<motion.g initial={{y:-260}} animate={{y:0}} transition={{duration:.9,ease:'easeIn'}} onAnimationComplete={done}>
     <rect x="198" y="40" width="4" height="270" fill="#e9eef5" stroke="#9aa6b5" strokeWidth=".6"/><rect x="190" y="10" width="20" height="40" rx="6" fill="#d99ab4"/></motion.g>}
  </svg>
  <div className="cakeUi">
   <AnimatePresence mode="wait"><motion.p key={st} className="script cakemsg" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{msg}</motion.p></AnimatePresence>
   {st==='idle'&&<button className="btn" onClick={()=>setSt('wish')}>Make a Birthday Wish ✨</button>}
   {st==='wish'&&<button className="btn" onClick={blow}>Blow the Candles 🌬️</button>}
   {st==='out'&&<button className="btn" onClick={()=>setSt('cutting')}>Cut Your Birthday Cake 🎂</button>}
  </div></div>;
}
