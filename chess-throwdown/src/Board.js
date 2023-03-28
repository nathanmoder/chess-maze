//Nathan Moder
//Last edited 3/27/2023


import React, {useState} from 'react'


/*
The Board component will be responsible for much of
the game's functioning. It will contain a grid of squares,
whose size is determined by the stage, and which may of may
not contain a piece. The name of the piece occupying the squares,
and whether it is a player or enemy piece, are stored in a useState Hook.

The Board is also responsible for starting the game, starting each stage,
detecting game overs, and allowing for piece movement.
*/

function Board() {
    //pieces will store an array of objects with four attributes.
        //it will later be augmented by the addPiece and initializeBoard functions
    const [pieces, setPieces]=useState([{pieceType:'none',allegiance:'none',blackwhite:'none',position:[0,0]}])

    //keeps track of whether or not the game has begun, so that initializeBoard
        //is not called excessively
    const [hasStarted,setHasStarted]=useState(false)

    //keeps track of what stage the player is on. the board will get
        //progressively larger as the player clears stages
    const [stageNumber,setStageNumber]=useState(1);

    //INPUT: Attributes equivalent to those of the object in pieces
    //Adds a new element to the array pieces
    //RETURN: None
    const addPiece = (_x,_y,_pieceType,_allegiance) => {
        const _blackwhite=_x+_y%2==0 ? 'white' : 'black';
        setPieces(prevPieces => [... prevPieces,{pieceType:_pieceType,allegiance:_allegiance,blackwhite:_blackwhite,position:[_x,_y]}])
    }

    //INPUT: Size of the board to be instantiated
    //After executing, pieces will be full of squares both without and containing pieces
    //RETURN: None
    const initializeBoard = (size) => {
        for(let i=0; i<size; i++){
            for(let j=0; j<size; j++){
                addPiece(i,j,'none','none')
            }
        }
    }

    //Initializes the board if this has not yet been done, or if a new stage is starting
    if(!hasStarted){
        initializeBoard((stageNumber<5 ? stageNumber+3 : 8))
        setHasStarted(true)
    }
    return (
        <div id="board">
            {pieces.map(
            e => {
                return (<div id={e.position[0]+e.position[1]} className={e.allegiance+e.blackwhite+" square"}>{e.pieceType}</div>)
            }
        )}
        </div>
    )
}




export default Board