import React from 'react'
import Score from './Score';
import Board from './Board';
import Timer from './Timer';
import '../static/home.css';
import { useState, createContext } from "react";
import { Link } from 'react-router-dom';


export const ScoreContext = createContext();
export const ScoreUpdateContext = createContext();
export const TimeContext = createContext();
export const TimeUpdateContext = createContext();

function Home() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(Date.now());
  return (

    <div className="App">
      <ScoreContext.Provider value={score}>
        <TimeContext.Provider value={time}>
          <TimeUpdateContext.Provider value={setTime}>
            <div className="row">
              <ScoreUpdateContext.Provider value={setScore}>
                <Board />
              </ScoreUpdateContext.Provider>
              <div className="col-sm-2"><div id='rulesLink'><Link to='/rules'>Rules</Link></div>
              <Score />
              <Timer /></div>
            </div>
          </TimeUpdateContext.Provider>
        </TimeContext.Provider>
      </ScoreContext.Provider>
    </div>

  );
}

export default Home