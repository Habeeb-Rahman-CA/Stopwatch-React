import { useEffect, useRef, useState } from "react"

function Stopwatch() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {

    if(isRunning){
        intervalIdRef.current = setInterval(() =>{
            setElapsedTime(Date.now() - startTimeRef.current)
        }, 10)
    }

    return () =>{
        clearInterval(intervalIdRef.current)
    }

  },[isRunning])

  const start = () =>{
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime
  }

  const stop = () =>{
    setIsRunning(false)
  }

  const reset = () =>{
    setElapsedTime(0)
    setIsRunning(false)
  }

  const formatTime = () =>{
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedTime / (1000) % 60)
    let milliSeconds = Math.floor((elapsedTime % 1000) / 10)

    return `${minutes}:${seconds}:${milliSeconds}`
  }

  return (
   <div className="stopwatch">
    <div className="display">{formatTime()}</div>
    <div className="buttons">
        <button className="startBtn" onClick={start}>Start</button>
        <button className="stopBtn" onClick={stop}>Stop</button>
        <button className="resetBtn" onClick={reset}>Reset</button>
    </div>
   </div>
  )
}

export default Stopwatch
