import './App.css';
import Rules from './Rules';
import Score from './Score';
import Board from './Board';

/*
The App component, the only child of the root component,
will create the layout of the webpage; broadly speaking,
a header bar with the player name, rules, and score, and
the board on which the game is played beneath it.
*/

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-4"><Rules /></div>
        <div className="col-sm-8"><Score /></div>
      </div>
      <Board />
    </div>
  );
}

export default App;
