import {useEffect,useRef} from 'react';
export const burst=(o={})=>window.dispatchEvent(new CustomEvent('fx',{detail:o}));
const cols=['#ff8fb8','#ffc2d9','#c9b3ff','#ffd3b0','#f4c7a1','#fff','#ffe08a'];
export function FX(){
 const ref=useRef();
 useEffect(()=>{
  const c=ref.current,x=c.getContext('2d');let ps=[],raf;
  const rs=()=>{c.width=innerWidth;c.height=innerHeight};rs();addEventListener('resize',rs);
  const on=e=>{const{x:px=innerWidth/2,y:py=innerHeight/2,n=80,kind='confetti'}=e.detail;
   for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*9+2,k=kind;
    const p={x:px,y:py,k,c:cols[i%cols.length],s:Math.random()*6+4,r:Math.random()*6,l:0,m:130+Math.random()*60,vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,g:.2};
    if(k==='smoke'){Object.assign(p,{vx:(Math.random()-.5)*.8,vy:-Math.random()*1.2-.5,g:-.005,m:110,s:5})}
    if(k==='rain'){Object.assign(p,{x:Math.random()*innerWidth,y:-10,vx:(Math.random()-.5)*2,vy:Math.random()*3+2,g:.03,m:300})}
    if(k==='crumb'){Object.assign(p,{c:['#e9b98a','#d99a6c','#ffd9e6'][i%3],s:Math.random()*3+2,m:90})}
    if(k==='sparkle'){Object.assign(p,{vx:Math.cos(a)*s*.7,vy:Math.sin(a)*s*.7,g:.05,s:Math.random()*3+2})}
    ps.push(p)}};
  addEventListener('fx',on);
  const loop=()=>{x.clearRect(0,0,c.width,c.height);
   ps=ps.filter(p=>p.l++<p.m);
   for(const p of ps){p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;const a=1-p.l/p.m;x.globalAlpha=Math.max(a,0);
    if(p.k==='smoke'){x.fillStyle='#bbb';x.beginPath();x.arc(p.x,p.y,p.s+p.l/6,0,6.28);x.globalAlpha=a*.3;x.fill()}
    else if(p.k==='confetti'||p.k==='rain'){x.save();x.translate(p.x,p.y);x.rotate(p.r+p.l*.1);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()}
    else{x.fillStyle=p.c;x.shadowColor=p.c;x.shadowBlur=p.k==='sparkle'?12:0;x.beginPath();x.arc(p.x,p.y,p.s/2,0,6.28);x.fill();x.shadowBlur=0}}
   raf=requestAnimationFrame(loop)};loop();
  return()=>{cancelAnimationFrame(raf);removeEventListener('fx',on);removeEventListener('resize',rs)}},[]);
 return <canvas ref={ref} className="fx"/>;
}
const em=['💗','✨','🦋','⭐','🌸','💖','🎀','🦋'];
export function Floaters(){
 const items=Array.from({length:26},(_,i)=>({e:em[i%em.length],l:(i*37)%100,d:12+(i*7)%14,dl:-(i*3)%20,s:14+(i*5)%22}));
 return <div className="floaters" aria-hidden>{items.map((o,i)=><span key={i} style={{left:o.l+'%',fontSize:o.s,animationDuration:o.d+'s',animationDelay:o.dl+'s'}}>{o.e}</span>)}</div>;
}
