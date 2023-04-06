import React, { useContext } from 'react'
import { ScoreContext } from './Home'

/*
The Score component will be responsible for displaying the
current score of the player, as well as keeping track of that
player's personal high score.
*/

function Score() {
  let score = useContext(ScoreContext)
  return (
    <div>Score: {score}</div>
  )
}

export default Score