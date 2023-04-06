import React, { useContext } from 'react';
import { TimeContext ,ScoreContext} from './Home';
import { useNavigate } from 'react-router-dom';


function Timer() {
    let time=useContext(TimeContext);
    //Allow the component to properly navigate to the game over screen.
    let score = useContext(ScoreContext)
    const navigate = useNavigate();

    if(time<0){
        navigate('gameover/' + score);
    }
  return (
    <div>Time Remaining: {Math.floor((time/1000/60)%60)}:{Math.floor((time / 1000) % 60)>=10?Math.floor((time / 1000) % 60):"0"+Math.floor((time / 1000) % 60)}</div>
  )
}

export default Timer;