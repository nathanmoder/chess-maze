import './App.css';
import {useState, createContext} from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import GameOver from './components/GameOver';
import Rules from './components/Rules';

/*
The App component, the only child of the root component,
will create the layout of the webpage; broadly speaking,
a header bar with the player name, rules, and score, and
the board on which the game is played beneath it.
*/


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='gameover' element={<GameOver />}>
        <Route path=':score' element={<GameOver />}></Route>
      </Route>
      <Route path='rules' element={<Rules />}></Route>
    </Routes>
  );
}

export default App;
