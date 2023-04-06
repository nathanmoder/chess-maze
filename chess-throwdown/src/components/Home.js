import React from 'react'
import Score from './Score';
import Board from './Board';
import Timer from './Timer';
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
              <div className="col-sm-4"><Link to='/rules'>Rules</Link></div>

              <div className="col-sm-4"><Score /></div>

              <div className="col-sm-4"><Timer /></div>

            </div>
            <ScoreUpdateContext.Provider value={setScore}>
              <Board />
            </ScoreUpdateContext.Provider>
          </TimeUpdateContext.Provider>
        </TimeContext.Provider>
      </ScoreContext.Provider>
    </div>

  );
}

export default Home