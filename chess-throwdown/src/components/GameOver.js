import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function GameOver() {

  const params=useParams();
  const score=params.score;
  const [playername,setPlayername]=useState('');
  const navigate=useNavigate();

  const getCookie = (cname) =>{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Decodes the cookies to get a more useable array
  //RETURN: An array of [string name, number score] of length 5
    //Default values will be filled in if the cookie has less than 5 scores.
  const getHighScores=()=>{
    const p1name=getCookie('rank1');
    if(p1name==''){
      //The default cookie for new players
      document.cookie='score1=100'
      document.cookie='score2=80'
      document.cookie='score3=60'
      document.cookie='score4=40'
      document.cookie='score5=20'
      document.cookie='rank1=NM'
      document.cookie='rank2=NM'
      document.cookie='rank3=NM'
      document.cookie='rank4=NM'
      document.cookie='rank5=NM'
    }
    return [[getCookie('rank1'),Number(getCookie('score1'))],[getCookie('rank2'),Number(getCookie('score2'))],[getCookie('rank3'),Number(getCookie('score3'))],[getCookie('rank4'),Number(getCookie('score4'))],[getCookie('rank5'),Number(getCookie('score5'))]];
  }

  //An array of [string name, number score]
  const highScores=getHighScores();

  //RETURN: An integer 0-5 of the ranking of this current score.
    //A return of 0 means that it is lower than all current high scores.
  const findScoreRanking= () => {
    let thisRank=0;
    let i=0;let found=false;
    while(i<5&&!found){
      if(score>highScores[i][1]){
        found=true;
        return i+1;
      }
      i++;
    }
    return 0;
  }

  //INPUT: an array of pairs
  //Will take the user's new name and score and, if applicable, add it to the appropriate spot in the cookie,
    //shifting the other scores. It will then navigate the user back to the home page
    //to play another game.
  //RETURN: None
  const handleClick=(scores)=>{
    const rank=findScoreRanking()
    if(rank>0){
      for(let i=4;i>=rank;i--){
        //move this score down 1 spot
        document.cookie='score'+(i+1)+'='+highScores[i-1][1];
        document.cookie='rank'+(i+1)+'='+highScores[i-1][0];
      }
      document.cookie='score'+rank+"="+score;
      document.cookie='rank'+rank+"="+playername;
    }

    navigate('../')
  }

  return (
    <div>
      <h1>Game Over.</h1>
      <h2>Your score is {score}</h2>
      <h3>
        <ol>
          <div>{highScores[0][0]}:{highScores[0][1]}</div>
          <div>{highScores[1][0]}:{highScores[1][1]}</div>
          <div>{highScores[2][0]}:{highScores[2][1]}</div>
          <div>{highScores[3][0]}:{highScores[3][1]}</div>
          <div>{highScores[4][0]}:{highScores[4][1]}</div>
        </ol>
      </h3>
      <h2>Enter your name: <input type="text" value={playername} onChange={e => setPlayername(e.target.value)}></input><button onClick={handleClick}>Play Again!</button></h2>
    </div>
  );
}

export default GameOver