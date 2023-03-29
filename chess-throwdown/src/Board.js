//Nathan Moder
//Last edited 3/27/2023


import React, {useState} from 'react'
import "./board.css"


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
    const [pieces, setPieces]=useState([{pieceType:'none',allegiance:'none',blackwhite:'white',position:[0,0]}])

    //keeps track of whether or not the game has begun, so that initializeBoard
        //is not called excessively
    const [hasStarted,setHasStarted]=useState(false)

    //keeps track of whose turn it is
    const [playerTurn,setPlayerTurn]=useState(true)

    //keeps track of what stage the player is on.
    const [stageNumber,setStageNumber]=useState(1)

    const [pieceSelected,setPieceSelected]=useState(false)

    //INPUT: Attributes equivalent to those of the object in pieces
    //Adds a new element to the array pieces
    //RETURN: None
    const addPiece = (_x,_y,_pieceType,_allegiance) => {
        const _blackwhite=(_x+_y)%2===0 ? 'white' : 'black';
        setPieces(prevPieces => [...prevPieces,{pieceType:_pieceType,allegiance:_allegiance,blackwhite:_blackwhite,position:[_x,_y]}])
    }

    const setPiece = (_x,_y,_pieceType,_allegiance) => {
        const _blackwhite=(_x+_y)%2===0 ? 'white' : 'black';
        const index=_x+(8*_y)
        setPieces(prevPieces => {
            const prevElements=prevPieces.slice(0,index)
            console.log(prevElements)
            const temp=prevPieces.slice(index+1,prevPieces.length-1)
            let subsequentElememnts=[]
            if(!(_x==7&&_y==7)){
                subsequentElememnts=[...temp,prevPieces[prevPieces.length-1]]}
            else{
                subsequentElememnts=temp
            }
            console.log(subsequentElememnts)
            const newPiece={pieceType:_pieceType,allegiance:_allegiance,blackwhite:_blackwhite,position:[_x,_y]}
            return [...prevElements,newPiece,...subsequentElememnts]        
        })
    }

    //INPUT: Size of the board to be instantiated
    //After executing, pieces will be full of squares both without and containing pieces
    //RETURN: None
    const initializeBoard = () => {
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(j!=0||i!=0)
                    addPiece(j,i,'none','none')
            }
        }
        //TODO: Place pieces
        setPiece(0,0,'rook','p');
        setPiece(0,7,'rook','p');
        setPiece(7,7,'rook','e');
        //addPiece(0,1,'bishop','p');addPiece(0,6,'bishop','p')
        //addPiece(0,2,'knight','p');addPiece(0,5,'knight','p')
        //TODO: Randomly place down the goal square
    }


    const newStage = () => {

    }

    const movePiece = (startx,starty,endx,endy) => {
        
    }

    
    //PieceMovement is a function describing the abilities of a piece
        //given it's name and position on the board
    //INPUT: ( {"king","queen","rook","knight","bishop","pawn"} , x-coordinate, y-coordinate)
    //OUTPUT: an array of pairs of numbers representing the squares the piece can move to.
    const PieceMovement = (name,x,y) => {
        return [[0,0]]
    }

    const showMovementRange= (x,y) => {
        //console.log(pieces)
        const squaresToAlight=PieceMovement(pieces[x+y*8].pieceType,x,y)
        //Sets the style of those squares to display
        for(let i of squaresToAlight){
            let square=document.getElementById("square"+(i[0]+(8*i[1])))
            square.style.backgroundColor="red"
        }
    }


    const hideMovementRange=(x,y) =>{
        const squaresToDim=PieceMovement(pieces[x+y*8].pieceType,x,y)
        for(let i of squaresToDim){
            let square=document.getElementById("square"+(i[0]+(8*i[1])))
            const _blackwhite=(i[0]+i[1])%2===0 ? 'beige' : 'green';
            square.style.backgroundColor=_blackwhite
        }
    }
    
    const handleClick = (x,y) => {
        console.log("hello")
        if(!pieceSelected){
            const square=pieces[x+y*8]
            //if(square.pieceType!='none'){
                showMovementRange(x,y)
            //}
            setPieceSelected([x,y])
        }
        else{
            const oldx = pieceSelected[0]
            const oldy = pieceSelected[1]
            const moveableSquares=PieceMovement(pieces[oldx+oldy*8].pieceType,oldx,oldy)
            let matched=false
            for(let i of moveableSquares){
                if([x,y]==i)
                    matched=true
            }
            if(matched)
                movePiece(oldx,oldy,x,y)
            hideMovementRange(oldx,oldy)
            setPieceSelected(false)
        }
    }
    
    
    //Initializes the board if this has not yet been done, or if a new stage is starting
    if(!hasStarted){
        if(stageNumber==1)
            initializeBoard()
        else
            newStage()
        setHasStarted(true)
    }
    return (
        <div id="board">
            {
                pieces.map(
                e => {
                    return (<div id={"square"+(e.position[0]+8*e.position[1])} className={e.allegiance+" "+e.blackwhite+" square"} onClick={(() => handleClick(e.position[0],e.position[1]))}>{e.pieceType}</div>)
                }
            )}
        </div>
    )
}




export default Board