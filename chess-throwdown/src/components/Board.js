//Nathan Moder
//Last edited 3/29/2023


import React, { useState, useContext , useEffect} from 'react';
import "../board.css";
import { ScoreUpdateContext, ScoreContext } from './Home';
import {useNavigate} from 'react-router-dom';
import PieceMovement from '../PieceMovement';
import MoveAI from '../MoveAI';


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
    const [pieces, setPieces] = useState([{ pieceType: 'none', allegiance: 'none', blackwhite: 'beige', position: [0, 0] }])

    //keeps track of whether or not the game has begun, so that initializeBoard
    //is not called excessively
    const [hasStarted, setHasStarted] = useState(false)

    //keeps track of whose turn it is
    const [playerTurn, setPlayerTurn] = useState(true)

    //keeps track of what stage the player is on.
    const [stageNumber, setStageNumber] = useState(1)

    const [pieceSelected, setPieceSelected] = useState(false)

    const scoreUpdate = useContext(ScoreUpdateContext);
    let score=useContext(ScoreContext)

    const navigate=useNavigate();

    //INPUT: Attributes equivalent to those of the object in pieces
    //Adds a new element to the array pieces
    //RETURN: None
    const addPiece = (_x, _y, _pieceType, _allegiance) => {
        const _blackwhite = (_x + _y) % 2 === 0 ? 'beige' : 'green';
        setPieces(prevPieces => [...prevPieces, { pieceType: _pieceType, allegiance: _allegiance, blackwhite: _blackwhite, position: [_x, _y] }])
    }

    const setPiece = (_x, _y, _pieceType, _allegiance) => {
        const index = _x + (8 * _y)
        setPieces(prevPieces => {
            const prevElements = prevPieces.slice(0, index)
            const temp = prevPieces.slice(index + 1, prevPieces.length - 1)
            let subsequentElememnts = []
            if (!(_x == 7 && _y == 7)) {
                subsequentElememnts = [...temp, prevPieces[prevPieces.length - 1]]
            }
            else {
                subsequentElememnts = temp
            }
            const newPiece = { pieceType: _pieceType, allegiance: _allegiance, blackwhite: prevPieces[index].blackwhite, position: [_x, _y] }
            return [...prevElements, newPiece, ...subsequentElememnts]
        })
    }

    const placePieces = () => {
        setPiece(0, 0, 'rook', 'p'); setPiece(0, 7, 'rook', 'p'); setPiece(7, 0, 'rook', 'e'); setPiece(7, 7, 'rook', 'e');
        setPiece(0, 1, 'bishop', 'p'); setPiece(0, 6, 'bishop', 'p'); setPiece(7, 1, 'bishop', 'e'); setPiece(7, 6, 'bishop', 'e');
        setPiece(0, 2, 'knight', 'p'); setPiece(0, 5, 'knight', 'p'); setPiece(7, 2, 'knight', 'e'); setPiece(7, 5, 'knight', 'e');
        setPiece(0, 3, 'king', 'p'); setPiece(7, 3, 'king', 'e'); setPiece(0, 4, 'queen', 'p'); setPiece(7, 4, 'queen', 'e');
        setPiece(1, 0, 'pawn', 'p'); setPiece(1, 1, 'pawn', 'p'); setPiece(1, 2, 'pawn', 'p'); setPiece(1, 3, 'pawn', 'p');
        setPiece(1, 4, 'pawn', 'p'); setPiece(1, 5, 'pawn', 'p'); setPiece(1, 6, 'pawn', 'p'); setPiece(1, 7, 'pawn', 'p');
        setPiece(6, 0, 'pawn', 'e'); setPiece(6, 1, 'pawn', 'e'); setPiece(6, 2, 'pawn', 'e'); setPiece(6, 3, 'pawn', 'e');
        setPiece(6, 4, 'pawn', 'e'); setPiece(6, 5, 'pawn', 'e'); setPiece(6, 6, 'pawn', 'e'); setPiece(6, 7, 'pawn', 'e');
    }

    //INPUT: Size of the board to be instantiated
    //After executing, pieces will be full of squares both without and containing pieces
    //RETURN: None
    const initializeBoard = () => {
        console.log("in initializer")
        scoreUpdate(0);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (j != 0 || i != 0)
                    addPiece(j, i, 'none', 'none');
            }
        }
        
        placePieces();

        //Randomly place down the goal square
        const randx = Math.floor(Math.random() * 4 + 2);
        const randy = Math.floor(Math.random() * 8);
        const index = randx + (8 * randy)
        setPieces(prevPieces => {
            const prevElements = prevPieces.slice(0, index)
            const temp = prevPieces.slice(index + 1, prevPieces.length - 1)
            let subsequentElememnts = []
            if (!(randx == 7 && randy == 7)) {
                subsequentElememnts = [...temp, prevPieces[prevPieces.length - 1]]
            }
            else {
                subsequentElememnts = temp
            }
            const newPiece = { pieceType: 'none', allegiance: 'none', blackwhite: 'gold', position: [randx, randy] }
            return [...prevElements, newPiece, ...subsequentElememnts]
        })
    }

    //TODO: Implement
    const findGoldSquare = () => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; ++j) {
                if (pieces[j + (i * 8)].blackwhite == 'gold')
                    return [j, i];
            }
        }
    }

    //TODO: Implement
    async function newStage(){
        console.log("in new stage")
        //Clear the board
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (j != 0 || i != 0)
                    setPiece(j, i, 'none', 'none');
            }
        }
        
        placePieces();

        //Remove the current goal square
        const gold = findGoldSquare();
        console.log(gold);
        const _blackwhite = (gold[0] + gold[1]) % 2 === 0 ? 'beige' : 'green';
        const index1 = gold[0] + (8 * gold[1]);
        setPieces(prevPieces => {
            const prevElements = prevPieces.slice(0, index1)
            const temp = prevPieces.slice(index1 + 1, prevPieces.length - 1)
            let subsequentElememnts = []
            if (!(randx == 7 && randy == 7)) {
                subsequentElememnts = [...temp, prevPieces[prevPieces.length - 1]]
            }
            else {
                subsequentElememnts = temp
            }
            const newPiece = { pieceType: 'none', allegiance: 'none', blackwhite: _blackwhite, position: [gold[0], gold[1]] }
            console.log("done removing old gold square");
            return [...prevElements, newPiece, ...subsequentElememnts]
        })
        let square1 = document.getElementById('square' + index1);
        console.log(square1.style.backgroundColor);
        square1.style.backgroundColor = _blackwhite;
        console.log(square1.style.backgroundColor);

        //Randomly place down the goal square
        const randx = Math.floor(Math.random() * 4 + 2);
        const randy = Math.floor(Math.random() * 8);
        const index = randx + (8 * randy)
        document.getElementById('square' + index).style.backgroundColor = 'gold';
        setPieces(prevPieces => {
            const prevElements = prevPieces.slice(0, index)
            const temp = prevPieces.slice(index + 1, prevPieces.length - 1)
            let subsequentElememnts = []
            if (!(randx == 7 && randy == 7)) {
                subsequentElememnts = [...temp, prevPieces[prevPieces.length - 1]]
            }
            else {
                subsequentElememnts = temp
            }
            const newPiece = { pieceType: 'none', allegiance: 'none', blackwhite: 'gold', position: [randx, randy] }
            return [...prevElements, newPiece, ...subsequentElememnts]
        })
        console.log("done with new stage")
    }

    //RETURN: 0 if none, 1 if friendly, 2 if enemy
    const hasPiece = (x, y, allegiance) => {
        if (x < 0 || x > 7 || y < 0 || y > 7 || pieces[x + (8 * y)].pieceType == 'none') {
            //console.log("AHHHHH0")
            return 0;
        }
        else {
            if (pieces[x + (8 * y)].allegiance == allegiance){
                //console.log("AHHHHH1")
                return 1;
            }
            else{
                //console.log("AHHHHH2")
                return 2;
            }
        }
    }

    const movePiece = (startx, starty, endx, endy) => {
        //console.log(startx);
        const pieceHere = pieces[startx + (8 * starty)];
        const pieceThere = pieces[endx + (8 * endy)];
        //Actually move the piece
        setPiece(endx, endy, pieceHere.pieceType, pieceHere.allegiance);
        setPiece(startx, starty, 'none', 'none');
        //Increment Score on kill
        if (hasPiece(endx, endy, pieceHere.allegiance) == 2 && pieceHere.allegiance=='p')
            scoreUpdate(prevScore => prevScore + 1);


        //If player king dies, game over
        if (pieceThere.pieceType == 'king' && pieceThere.allegiance == 'p') {
            navigate('gameover/'+score);
        }

        //TODO: If enemy king dies, next stage and increment score

        //If player king onto gold, next stage and increment score
        if (pieceHere.pieceType == 'king' && pieceHere.allegiance == 'p' && pieceThere.blackwhite == 'gold') {
            //TODO: Go to next stage
            scoreUpdate(prevScore => prevScore + (10 * stageNumber));
            setPlayerTurn(true);
            setStageNumber(prevStage => prevStage + 1);
            //REWRITE AS A USE EFFECT
            return true;
        }
        return false;


    }

    const showMovementRange = (x, y) => {
        //console.log(pieces)
        const squaresToAlight = PieceMovement(pieces[x + y * 8].pieceType, x, y, pieces)
        //Sets the style of those squares to display
        for (let i of squaresToAlight) {
            let square = document.getElementById("square" + (i[0] + (8 * i[1])))
            square.style.backgroundColor = "red"
        }
    }


    const hideMovementRange = (x, y, seizeCase, newx, newy) => {
        console.log("in hide movement")
        const squaresToDim = PieceMovement(pieces[x + y * 8].pieceType, x, y, pieces)
        for (let i of squaresToDim) {
            if(!(i[0]==newx&&i[1]==newy&&seizeCase)){
                let square = document.getElementById("square" + (i[0] + (8 * i[1])))
                const _blackwhite = pieces[i[0] + (8 * i[1])].blackwhite;
                console.log(_blackwhite);
                square.style.backgroundColor = _blackwhite;
            }
        }
        console.log("done with hide movement")
    }

    //REWRITE AS A USE EFFECT
    /*const enemyMove = () =>{
        let temp=[...pieces]
        const moveToMake=MoveAI(stageNumber+1,temp);
        console.log(moveToMake);
        movePiece(moveToMake[1][0][0],moveToMake[1][0][1],moveToMake[1][1][0],moveToMake[1][1][1]);
        setPlayerTurn(true);
    }*/

    useEffect(()=>{
        if(!playerTurn){
            let temp=[...pieces]
            const moveToMake=MoveAI(stageNumber+1,temp);
            //console.log(moveToMake);
            movePiece(moveToMake[0][0],moveToMake[0][1],moveToMake[1][0],moveToMake[1][1]);
            setPlayerTurn(true);
        }
    },[playerTurn]);

    const handleClick = (x, y) => {
        if(playerTurn){
            if (!pieceSelected) {
                const square = pieces[x + y * 8]
                if (square.pieceType != 'none') {
                    showMovementRange(x, y)
                }
                setPieceSelected([x, y])
            }
            else {
                const oldx = pieceSelected[0]
                const oldy = pieceSelected[1]
                const moveableSquares = PieceMovement(pieces[oldx + oldy * 8].pieceType, oldx, oldy, pieces)
                let matched = false
                for (let i of moveableSquares) {
                    if (x == i[0] && y == i[1])
                        matched = true
                }
                if (matched) {
                    const seizeCase=movePiece(oldx, oldy, x, y);
                    hideMovementRange(oldx, oldy,seizeCase,x,y);
                    setPieceSelected(false);
                    if(!seizeCase)
                        setPlayerTurn(false)
                    //REWRITE AS A USE EFFECT
                    //enemyMove();
                }
                else{
                hideMovementRange(oldx, oldy,false,x,y);
                setPieceSelected(false);
                }
            }
        }
    }


    //Initializes the board if this has not yet been done, or if a new stage is starting
    //REWRITE AS A USE EFFECT
    /*if (!hasStarted) {
        setHasStarted(prevStart => true)
        if (stageNumber == 1) {
            initializeBoard()
        }
        else {
            // newStage()
        }
    }
    */
    useEffect(()=>{
        if (stageNumber !=1){
            newStage();
        }
    },[stageNumber])
    useEffect(()=>{
        if(!hasStarted){
            setHasStarted(true);
            initializeBoard();
        }
    },[])
    return (
        <div id="board">
            {
                pieces.map(
                    e => {
                        return (<div id={"square" + (e.position[0] + 8 * e.position[1])} className={e.allegiance + " " + e.blackwhite + " square"} onClick={(() => handleClick(e.position[0], e.position[1]))}><img src={"images/"+e.allegiance+e.pieceType+".png"} alt='a'  className="piece"></img></div>)
                    }
                )}
        </div>
    )
}




export default Board