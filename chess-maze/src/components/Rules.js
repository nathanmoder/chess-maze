import React from 'react'
import { Link } from 'react-router-dom';
import '../static/board.css';
import '../static/rules.css';


/*
This component will create a webpage that communicates the rules of the game.
Included in this will be piece movement, objectives, and scoring.
It also links back to the game page.
*/
function Rules() {

  const getPawnBoard = () => {
    return <div id='pawn'>
      <div className="square beige"></div>
      <div className="square red"><img src={"images/epawn.png"} alt="pawn" className="piece"></img></div>
      <div className="square beige"></div>
      <div className="square green"><img src={"images/ppawn.png"} alt="pawn" className="piece"></img></div>
      <div className="square red"></div>
      <div className="square red"></div>
      <div className="square beige"></div>
      <div className="square green"></div>
      <div className="square beige"></div>
    </div>
  }
  const getBishopBoard = () => {
    return <div id='bishop'>
      <div className="square red"></div><div className="square green"></div><div className="square beige"></div><div className="square green"></div><div className="square red"></div>
      <div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div>
      <div className="square beige"></div><div className="square green"></div><div className="square beige"><img src={"images/pbishop.png"} alt="bishop" className="piece"></img></div><div className="square green"></div><div className="square beige"></div>
      <div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div>
      <div className="square red"></div><div className="square green"></div><div className="square beige"></div><div className="square green"></div><div className="square red"></div>
    </div>
  }
  const getKnightBoard = () => {
    return <div id='knight'>
      <div className="square beige"></div><div className="square red"></div><div className="square beige"></div><div className="square red"></div><div className="square beige"></div>
      <div className="square red"></div><div className="square beige"></div><div className="square green"></div><div className="square beige"></div><div className="square red"></div>
      <div className="square beige"></div><div className="square green"></div><div className="square beige"><img src={"images/pknight.png"} alt="knight" className="piece"></img></div><div className="square green"></div><div className="square beige"></div>
      <div className="square red"></div><div className="square beige"></div><div className="square green"></div><div className="square beige"></div><div className="square red"></div>
      <div className="square beige"></div><div className="square red"></div><div className="square beige"></div><div className="square red"></div><div className="square beige"></div>
    </div>
  }
  const getRookBoard = () => {
    return <div id='rook'>
      <div className="square beige"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square beige"></div>
      <div className="square green"></div><div className="square beige"></div><div className="square red"></div><div className="square beige"></div><div className="square green"></div>
      <div className="square red"></div><div className="square red"></div><div className="square beige"><img src={"images/prook.png"} alt="rook" className="piece"></img></div><div className="square red"></div><div className="square red"></div>
      <div className="square green"></div><div className="square beige"></div><div className="square red"></div><div className="square beige"></div><div className="square green"></div>
      <div className="square beige"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square beige"></div>
    </div>
  }
  const getQueenBoard = () => {
    return <div id='queen'>
      <div className="square red"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square red"></div>
      <div className="square green"></div><div className="square red"></div><div className="square red"></div><div className="square red"></div><div className="square green"></div>
      <div className="square red"></div><div className="square red"></div><div className="square beige"><img src={"images/pqueen.png"} alt="queen" className="piece"></img></div><div className="square red"></div><div className="square red"></div>
      <div className="square green"></div><div className="square red"></div><div className="square red"></div><div className="square red"></div><div className="square green"></div>
      <div className="square red"></div><div className="square green"></div><div className="square red"></div><div className="square green"></div><div className="square red"></div>
    </div>
  }
  const getKingBoard = () => {
    return <div id='king'>
      <div className="square beige"></div><div className="square green"></div><div className="square beige"></div><div className="square green"></div><div className="square beige"></div>
      <div className="square green"></div><div className="square red"></div><div className="square red"></div><div className="square red"></div><div className="square green"></div>
      <div className="square beige"></div><div className="square red"></div><div className="square beige"><img src={"images/pking.png"} alt="king" className="piece"></img></div><div className="square red"></div><div className="square beige"></div>
      <div className="square green"></div><div className="square red"></div><div className="square red"></div><div className="square red"></div><div className="square green"></div>
      <div className="square beige"></div><div className="square green"></div><div className="square beige"></div><div className="square green"></div><div className="square beige"></div>
    </div>
  }
  return (
    <div>
      <h1 className='rules-title'>Welcome to Chess Maze!</h1>
      <h2 id='rules-link'><Link to="/">Return to the Game</Link></h2>
      <h3 id='rules-description'>Chess Maze is a fast-paced chess game where you must navigate your king onto the golden square on the board as quickly as possible. That's it! All of the pieces move the same as in regular chess, but here's a refresher:</h3>
      <div class='row'>
        <div class='col-sm-6'>
          <h3 className='rules-title'>Movement</h3>
          <div><h4>The Pawn</h4>
            {getPawnBoard()}
            The pawn normally only can move one space forward, and can take enemy pieces one space diagonally. However, if it has not yet moved, it can move two spaces forward.
          </div>
          <div><h4>The Bishop</h4>
            {getBishopBoard()}
            The bishop moves diagonally on the same color square it starts on. So long as it doesn't hit another piece, it can move as far as it likes.
          </div>
          <div><h4>The Rook</h4>
            {getRookBoard()}
            The rook moves similarly to the bishop, able to move as far as it likes vertically and horizontally so long as it does not collide with another piece.
          </div>
          <div><h4>The Knight</h4>
            {getKnightBoard()}
            The knight moves unlike any other piece. It must move two squares horizontally or vertically, and then one square in the other direction. It is able to jump over pieces.
          </div>
          <div><h4>The Queen</h4>
            {getQueenBoard()}
            The queen is usually regarded as the strongest piece on the board. It has the movement of both the rook and bishop, able to move as far as it likes in any one direction.
          </div>
          <div><h4>The King</h4>
            {getKingBoard()}
            The king is the most important piece on the board; if either side loses their king, they lose the round. If YOU lose your king, you get a game over. The king moves one square in any direction.
          </div>
        </div>
        <div class='col-sm-6'>
          <h3 className='rules-title'>Scoring</h3>
          <div>Taking an enemy piece: 1 Point</div>
          <div>Stepping onto the gold square: 10 points x The stage number</div>
        </div>
      </div>
    </div>
  )
}

export default Rules