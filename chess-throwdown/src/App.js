import './App.css';
import Rules from './Rules';
import Score from './Score';
import Board from './Board';
import {useState, createContext} from "react";

/*
The App component, the only child of the root component,
will create the layout of the webpage; broadly speaking,
a header bar with the player name, rules, and score, and
the board on which the game is played beneath it.
*/

export const ScoreContext=createContext()
export const ScoreUpdateContext=createContext()
function App() {
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

export default App;
