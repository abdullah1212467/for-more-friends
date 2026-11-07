import {useEffect,useRef,useState} from 'react';import {motion} from 'framer-motion';
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
export default function Intro({onEnter}){
 const c=useRef(),[s,setS]=useState(reduce()?3:0);
 useEffect(()=>{const t=[2400,5200,8200].map((d,i)=>setTimeout(()=>setS(i+1),d));return()=>t.forEach(clearTimeout)},[]);
 useEffect(()=>{const cv=c.current,x=cv.getContext('2d');let raf;const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};rs();addEventListener('resize',rs);
  const n=innerWidth<700?350:1000,st=Array.from({length:n},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.3+.2,p:Math.random()*6}));
  const bf=Array.from({length:7},(_,i)=>({y:.12+i*.12,s:.00004+i*.00001,o:i*.17}));
  const loop=t=>{x.clearRect(0,0,cv.width,cv.height);x.fillStyle='#fff';
   for(const q of st){x.globalAlpha=.3+.7*Math.abs(Math.sin(t/900+q.p));x.beginPath();x.arc(q.x*cv.width,q.y*cv.height,q.r,0,6.28);x.fill()}
   if(!reduce())for(const b of bf){const px=((t*b.s+b.o)%1.2-.1)*cv.width,py=b.y*cv.height+Math.sin(t/400+b.o*9)*22,w=Math.abs(Math.sin(t/130+b.o*5))*9+2;
    x.globalAlpha=.9;x.fillStyle='#ff9fd0';x.shadowColor='#ff9fd0';x.shadowBlur=14;x.beginPath();x.ellipse(px-w/2,py,w,7,.5,0,6.28);x.ellipse(px+w/2,py,w,7,-.5,0,6.28);x.fill();x.shadowBlur=0}
   raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
  return()=>{cancelAnimationFrame(raf);removeEventListener('resize',rs)}},[]);
 const T=['A Magical Day Is Here...','Someone Beautiful Is Turning 20','Tuba Iman','Tuba Iman'];
 return <motion.div className="intro" exit={{opacity:0,scale:1.2,filter:'blur(16px)'}} transition={{duration:1}}>
  <canvas ref={c} className="stars"/><motion.div className="moon" initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:3}}/>
  <motion.h1 key={s>2?2:s} className={'script '+(s>=2?'big':'introtxt')} initial={{opacity:0,y:20,filter:'blur(12px)',letterSpacing:'.3em'}} animate={{opacity:1,y:0,filter:'blur(0px)',letterSpacing:'0em'}} transition={{duration:1.8}}>{T[s]}</motion.h1>
  {s>=3&&<motion.button className="btn pulse" onClick={onEnter} initial={{opacity:0}} animate={{opacity:1}} whileHover={{scale:1.07}} whileTap={{scale:.95}}>Enter Her Magical World ✨</motion.button>}
 </motion.div>}
