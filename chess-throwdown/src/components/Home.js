import React from 'react'
import Rules from './Rules';
import Score from './Score';
import Board from './Board';
import {useState, createContext} from "react";

export const ScoreContext=createContext()
export const ScoreUpdateContext=createContext()
function Home() {
    const [score,setScore]=useState(0);
    return (
      
        <div className="App">
          <div className="row">
            <div className="col-sm-4"><Rules /></div>
            <ScoreContext.Provider value={score}>
              <div className="col-sm-8"><Score /></div>
            </ScoreContext.Provider>
          </div>
          <ScoreUpdateContext.Provider value={setScore}>
            <Board />
          </ScoreUpdateContext.Provider>
        </div>
      
    );
}

export default Home