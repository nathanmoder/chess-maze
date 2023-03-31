import React from 'react'
import Rules from './Rules';
import Score from './Score';
import Board from './Board';
import { useState, createContext } from "react";
import { Link } from 'react-router-dom';


export const ScoreContext = createContext()
export const ScoreUpdateContext = createContext()
function Home() {
  const [score, setScore] = useState(0);
  return (

    <div className="App">
      <ScoreContext.Provider value={score}>
        <div className="row">
          <div className="col-sm-4"><Link to='/rules'>Rules</Link></div>

          <div className="col-sm-8"><Score /></div>

        </div>
        <ScoreUpdateContext.Provider value={setScore}>
          <Board />
        </ScoreUpdateContext.Provider>
      </ScoreContext.Provider>
    </div>

  );
}

export default Home