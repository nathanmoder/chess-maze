import './App.css';
import {useState, createContext} from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import GameOver from './components/GameOver';
import Rules from './components/Rules';

/*
The App component, the only child of the root component,
will create the relevant routes for the webpage;
one to the game, one to the rules, and one to the game over screen.
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
