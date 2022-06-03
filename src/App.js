import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef} from 'react';
import soundURL from './audio/beep.wav'


const App = () => {
  let [timer,setTimer] = useState('25:00');
  let [timerLabel,setTimerLabel] = useState('Session');
  let [session,setSession] = useState(25);
  let [timeleft,setTimeleft] = useState(session);
  let [breaks,setBreaks] = useState(5);
  let [running,setRunning] = useState(false);
  let [resetCount,setResetCount] = useState(0);
  let countRef = useRef(null);
  countRef.current = running;  
  let labelRef = useRef(null);
  labelRef.current = timerLabel; 
  let countReset = useRef(null);
  countReset.current = resetCount; 


  useEffect(() => {
    setTimer('' + session + ':00');
    setTimeleft(session);
  }, [session]);


  function increment(btn){
    if (running === false) {
      if (btn === 'session') {
        if (session < 60) {
        setSession(session + 1);
      }
      } else {
        if (breaks < 60) {
        setBreaks(breaks + 1);
      }
      }
    }
  }

  function decrement(btn){
    if (running === false) {
    if (btn === 'session') {
      if (session > 1) {
        setSession(session - 1);
      }
    } else {
      if (breaks > 1) {
        setBreaks(breaks - 1);
      }
    }
    }
  }

  
  function runTimer(){
    if (running === false) {
    setRunning(true);
    }
    else if(running === true){
      setRunning(false);
    }
  }
  function playSound(p){
    const sound = document.getElementById('beep');
    if (p === "play") {
          sound.play();
        setTimeout(() => {
          sound.pause();
          sound.currentTime = 0;
        }, 2000);
    }
    else{
          sound.pause();
          sound.currentTime = 0;
    }
  }
  useEffect(() => {
    if(countRef.current === true || running === true){
      
      var time = new Date(timeleft*60000).getTime();
      if (timeleft === session || timeleft === breaks) {
        time -= 1000;
      } 
      console.log(time, 'time');
      var x = setInterval(function() {
        if(countReset.current > 0){
          setTimer('25:00');
          setTimerLabel('Session');
          console.log('sientra');
          time = new Date(session*60000).getTime();
          setResetCount(0);
          clearInterval(x);
        }
          var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((time % (1000 * 60)) / 1000);
          var ceroM = (minutes < 10 ? '0' : '');
          var ceroS = (seconds < 10 ? '0' : '');
          setTimer(`${ceroM}${minutes}:${ceroS}${seconds}`)
          console.log(time, 'si', countRef.current);
          time -= 1000;
          setTimeleft(time/60000);
          console.log(time);
            if (time === -1000 ) {
              
              if(countReset.current > 0){
                setTimer('25:00');
                setTimerLabel('Session');
                time = new Date(session*60000).getTime();
                setResetCount(0);
                clearInterval(x);
              }
              if (labelRef.current === 'Session') {
                setTimerLabel('Break');
                console.log('llega a 0 en el session');
                time = new Date(breaks*60000).getTime();
                console.log(breaks);
                setTimeleft(breaks);
                playSound("play");
              } 
              else {
                setTimerLabel('Session');
                console.log('llega a 0 en breaks');
                time = new Date(session*60000).getTime();
                console.log(session);
                setTimeleft(session);
                playSound("play");
              }
                
            }
            if (countRef.current === false) {
              clearInterval(x);
            }
            
      }, 1000);
    } 
  
  }, [running]);

  function reset(){
    setResetCount(1)
    setRunning(false);
    setBreaks(5);
    setSession(25);
    setTimeleft(25);
    setTimerLabel('Session');
    setTimer('25:00');
    setTimeout(() => {
      setResetCount(0);
      setSession(25);
      setTimeleft(25);
      setTimer('25:00');
    }, 1000);
    playSound("pause");
  }
  return (
    <div className="App">
    <header className="App-header">
    <h1>25 + 5 Clock</h1>
     <audio hidden controls id="beep" src={soundURL}></audio> 
<div className="container">
    <div className="sets-container">
      <div id="break-label">
        <button className="btn btn-primary mybutton" id="break-increment" onClick={() => increment('break')}>
         <p>+</p>
        </button>
        <h4>break length</h4>
        <button className="btn btn-danger mybutton" id="break-decrement" onClick={() => decrement('break')}>
         <p>-</p>
        </button>
      </div>
      <div id="break-length">{breaks}</div> 
    </div>

    <div className="sets-container">
      <div id="session-label">
        <button className="btn btn-primary mybutton" id="session-increment" onClick={() => increment('session')}>
         <p>+</p>
        </button>
        <h4>session length</h4>
        <button className="btn btn-danger mybutton" id="session-decrement" onClick={() => decrement('session')}>
          <p>-</p>
        </button>
      </div>
      <div id="session-length">{session}</div>
    </div>
   
    </div>
    
<h2>Timer</h2>
<div id="timer-label">{timerLabel}</div>
<div id="time-left">{timer}</div>
<div className="button-container">

    <button className=" btn btn-success " id="start_stop" onClick={runTimer}><i className="bi bi-play-fill"></i>
    / 
    <i className="bi bi-pause-fill"></i>
    </button>

    <button className="btn btn-secondary" id="reset" onClick={reset}>
    <i className="bi bi-arrow-repeat"></i>
    </button>
    </div>
      </header>
    </div>

    
  );
}

export default App;
