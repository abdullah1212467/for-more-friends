import {useState} from 'react';import {motion,AnimatePresence} from 'framer-motion';
import {FX,Floaters,burst} from './components/Effects.jsx';import Cake from './components/Cake.jsx';import Intro from './components/Intro.jsx';import MusicPlayer from './components/Music.jsx';
import {Hero,Age,Letter,Gallery,Reasons,Gift,Finale} from './components/Sections.jsx';
export default function App(){
 const [open,setOpen]=useState(false);
 const go=()=>{burst({n:120,kind:'sparkle'});burst({n:100});setTimeout(()=>setOpen(true),700)};
 return <>
  <Floaters/><FX/>
  <AnimatePresence mode="wait">
   {!open?<Intro key="i" onEnter={go}/>
   :<motion.main key="m" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2}}>
     <MusicPlayer/><Hero/><Age/><Letter/>
     <section><h2>Make a Wish</h2><Cake/></section>
     <Gallery/><Reasons/><Gift/><Finale/></motion.main>}
  </AnimatePresence></>;
}
