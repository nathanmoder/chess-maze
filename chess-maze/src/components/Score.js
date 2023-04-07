import React, { useContext } from 'react';
import { ScoreContext } from './Home';
import '../static/score.css';

/*
The Score component will be responsible for displaying the
current score of the player, as well as keeping track of that
player's personal high score.
*/

function Score() {
  let score = useContext(ScoreContext);
  return (
    <div id='score'>Score: {score}</div>
  )
}

export default Score