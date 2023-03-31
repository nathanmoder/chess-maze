import React from 'react';
import {useParams} from 'react-router-dom';

function GameOver() {

  const params=useParams();
  const score=params.score;

  const getCookie = () =>{

  }

  const setCookie = () =>{
    
  }







  return (
    <div>Game Over. Your score is {score}</div>
  );
}

export default GameOver