import {useEffect,useRef,useState} from 'react';import {Music,Pause,Volume2,VolumeX} from 'lucide-react';
export default function MusicPlayer(){
 const a=useRef(),cv=useRef(),ctx=useRef(),an=useRef(),[on,setOn]=useState(false),[mute,setMute]=useState(false),[err,setErr]=useState(false);
 useEffect(()=>{let raf;const x=cv.current.getContext('2d'),d=new Uint8Array(16);
  const f=()=>{x.clearRect(0,0,60,26);if(an.current)an.current.getByteFrequencyData(d);
   for(let i=0;i<8;i++){const v=on?(an.current&&d[i+1]>5?d[i+1]/255:.25+.5*Math.abs(Math.sin(Date.now()/200+i))):.12;x.fillStyle='#ffb3d9';x.fillRect(i*7.5,26-v*26,5,v*26)}raf=requestAnimationFrame(f)};f();return()=>cancelAnimationFrame(raf)},[on]);
 const toggle=async()=>{try{if(on){a.current.pause();setOn(false);return}
  if(!ctx.current){const C=window.AudioContext||window.webkitAudioContext;ctx.current=new C();an.current=ctx.current.createAnalyser();an.current.fftSize=64;ctx.current.createMediaElementSource(a.current).connect(an.current);an.current.connect(ctx.current.destination)}
  await ctx.current.resume();await a.current.play();setOn(true);setErr(false)}catch{setErr(true)}};
 return <div className="music"><audio ref={a} src="/birthday-music.mp3" loop preload="none" muted={mute}/>
  {err&&<small>Add public/birthday-music.mp3</small>}<canvas ref={cv} width="60" height="26"/>
  <button onClick={()=>setMute(!mute)} aria-label="Mute">{mute?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
  <button onClick={toggle} aria-label="Play or pause music">{on?<Pause size={20}/>:<Music size={20}/>}</button></div>}
