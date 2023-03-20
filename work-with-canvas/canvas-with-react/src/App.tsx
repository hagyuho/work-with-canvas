import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
const canvasRef = useRef<HTMLCanvasElement>(null);
const canvas = canvasRef.current;
const ctx = canvas?.getContext('2d');
const [stageWidth,setStageWidth] = useState<number>(document.body.clientWidth);
const [stageHeight,setStageHeight] = useState<number>(document.body.clientHeight)


const resize = () => {
  setStageWidth(document.body.clientWidth);
  setStageHeight(document.body.clientHeight)
  ctx?.scale(2,2)
}

const animate = () => {
  requestAnimationFrame(animate)
  ctx?.clearRect(0,0, stageWidth, stageHeight)
}



useEffect(()=>{
  requestAnimationFrame(animate)
  window.addEventListener('resize',resize)
})

  return (
    <div className="App">
      <canvas ref = {canvasRef} width={stageWidth} height={stageHeight}/>
    </div>
  );
}

export default App;
