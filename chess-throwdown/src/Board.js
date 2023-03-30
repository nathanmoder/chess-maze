//Nathan Moder
//Last edited 3/29/2023


import React, {useState, useContext} from 'react'
import "./board.css"
import { ScoreUpdateContext } from './App'


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
    const [pieces, setPieces]=useState([{pieceType:'none',allegiance:'none',blackwhite:'beige',position:[0,0]}])

    //keeps track of whether or not the game has begun, so that initializeBoard
        //is not called excessively
    const [hasStarted,setHasStarted]=useState(false)

    //keeps track of whose turn it is
    const [playerTurn,setPlayerTurn]=useState(true)

    //keeps track of what stage the player is on.
    const [stageNumber,setStageNumber]=useState(1)

    const [pieceSelected,setPieceSelected]=useState(false)

    const scoreUpdate=useContext(ScoreUpdateContext);

    //INPUT: Attributes equivalent to those of the object in pieces
    //Adds a new element to the array pieces
    //RETURN: None
    const addPiece = (_x,_y,_pieceType,_allegiance) => {
        const _blackwhite=(_x+_y)%2===0 ? 'beige' : 'green';
        setPieces(prevPieces => [...prevPieces,{pieceType:_pieceType,allegiance:_allegiance,blackwhite:_blackwhite,position:[_x,_y]}])
    }

    const setPiece = (_x,_y,_pieceType,_allegiance) => {
        const index=_x+(8*_y)
        setPieces(prevPieces => {
            const prevElements=prevPieces.slice(0,index)
            const temp=prevPieces.slice(index+1,prevPieces.length-1)
            let subsequentElememnts=[]
            if(!(_x==7&&_y==7)){
                subsequentElememnts=[...temp,prevPieces[prevPieces.length-1]]}
            else{
                subsequentElememnts=temp
            }
            const newPiece={pieceType:_pieceType,allegiance:_allegiance,blackwhite:prevPieces[index].blackwhite,position:[_x,_y]}
            return [...prevElements,newPiece,...subsequentElememnts]        
        })
    }

    //INPUT: Size of the board to be instantiated
    //After executing, pieces will be full of squares both without and containing pieces
    //RETURN: None
    const initializeBoard = () => {
        console.log("in initializer")
        scoreUpdate(0);
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(j!=0||i!=0)
                    addPiece(j,i,'none','none');
            }
        }
        //Place pieces
        setPiece(0,0,'rook','p');setPiece(0,7,'rook','p');setPiece(7,0,'rook','e');setPiece(7,7,'rook','e');
        setPiece(0,1,'bishop','p');setPiece(0,6,'bishop','p');setPiece(7,1,'bishop','e');setPiece(7,6,'bishop','e');
        setPiece(0,2,'knight','p');setPiece(0,5,'knight','p');setPiece(7,2,'knight','e');setPiece(7,5,'knight','e');
        setPiece(0,3,'king','p');setPiece(7,3,'king','e');setPiece(0,4,'queen','p');setPiece(7,4,'queen','e');
        setPiece(1,0,'pawn','p');setPiece(1,1,'pawn','p');setPiece(1,2,'pawn','p');setPiece(1,3,'pawn','p');
        setPiece(1,4,'pawn','p');setPiece(1,5,'pawn','p');setPiece(1,6,'pawn','p');setPiece(1,7,'pawn','p');
        setPiece(6,0,'pawn','e');setPiece(6,1,'pawn','e');setPiece(6,2,'pawn','e');setPiece(6,3,'pawn','e');
        setPiece(6,4,'pawn','e');setPiece(6,5,'pawn','e');setPiece(6,6,'pawn','e');setPiece(6,7,'pawn','e');
        
        //Randomly place down the goal square
        const randx=Math.floor(Math.random()*4+2);
        const randy=Math.floor(Math.random()*8);
        const index=randx+(8*randy)
        setPieces(prevPieces => {
            const prevElements=prevPieces.slice(0,index)
            const temp=prevPieces.slice(index+1,prevPieces.length-1)
            let subsequentElememnts=[]
            if(!(randx==7&&randy==7)){
                subsequentElememnts=[...temp,prevPieces[prevPieces.length-1]]}
            else{
                subsequentElememnts=temp
            }
            const newPiece={pieceType:'none',allegiance:'none',blackwhite:'gold',position:[randx,randy]}
            return [...prevElements,newPiece,...subsequentElememnts]        
        })
    }

    //TODO: Implement
    const findGoldSquare = () => {
        for(let i=0;i<8;i++){
            for(let j=0;j<8;++j){
                if(pieces[j+(i*8)].blackwhite=='gold')
                    return[j,i];
            }
        }
    }

    //TODO: Implement
    const newStage = () => {
        console.log("in new stage")
        //Clear the board
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(j!=0||i!=0)
                    setPiece(j,i,'none','none');
            }
        }
        //Place pieces
        setPiece(0,0,'rook','p');setPiece(0,7,'rook','p');setPiece(7,0,'rook','e');setPiece(7,7,'rook','e');
        setPiece(0,1,'bishop','p');setPiece(0,6,'bishop','p');setPiece(7,1,'bishop','e');setPiece(7,6,'bishop','e');
        setPiece(0,2,'knight','p');setPiece(0,5,'knight','p');setPiece(7,2,'knight','e');setPiece(7,5,'knight','e');
        setPiece(0,3,'king','p');setPiece(7,3,'king','e');setPiece(0,4,'queen','p');setPiece(7,4,'queen','e');
        setPiece(1,0,'pawn','p');setPiece(1,1,'pawn','p');setPiece(1,2,'pawn','p');setPiece(1,3,'pawn','p');
        setPiece(1,4,'pawn','p');setPiece(1,5,'pawn','p');setPiece(1,6,'pawn','p');setPiece(1,7,'pawn','p');
        setPiece(6,0,'pawn','e');setPiece(6,1,'pawn','e');setPiece(6,2,'pawn','e');setPiece(6,3,'pawn','e');
        setPiece(6,4,'pawn','e');setPiece(6,5,'pawn','e');setPiece(6,6,'pawn','e');setPiece(6,7,'pawn','e');

        //Remove the current goal square
        const gold=findGoldSquare();
        console.log(gold);
        const _blackwhite=(gold[0]+gold[1])%2===0 ? 'beige' : 'green';
        const index1=gold[0]+(8*gold[1]);
        setPieces(prevPieces => {
            const prevElements=prevPieces.slice(0,index1)
            const temp=prevPieces.slice(index1+1,prevPieces.length-1)
            let subsequentElememnts=[]
            if(!(randx==7&&randy==7)){
                subsequentElememnts=[...temp,prevPieces[prevPieces.length-1]]}
            else{
                subsequentElememnts=temp
            }
            const newPiece={pieceType:'none',allegiance:'none',blackwhite:_blackwhite,position:[gold[0],gold[1]]}
            return [...prevElements,newPiece,...subsequentElememnts]        
        })
        let square1=document.getElementById('square'+index1);
        console.log(square1.style.backgroundColor);
        square1.style.backgroundColor="beige";
        console.log(square1.style.backgroundColor);

        //Randomly place down the goal square
        const randx=Math.floor(Math.random()*4+2);
        const randy=Math.floor(Math.random()*8);
        const index=randx+(8*randy)
        document.getElementById('square'+index).style.backgroundColor='gold';
        setPieces(prevPieces => {
            const prevElements=prevPieces.slice(0,index)
            const temp=prevPieces.slice(index+1,prevPieces.length-1)
            let subsequentElememnts=[]
            if(!(randx==7&&randy==7)){
                subsequentElememnts=[...temp,prevPieces[prevPieces.length-1]]}
            else{
                subsequentElememnts=temp
            }
            const newPiece={pieceType:'none',allegiance:'none',blackwhite:'gold',position:[randx,randy]}
            return [...prevElements,newPiece,...subsequentElememnts]        
        })
    }

    //RETURN: 0 if none, 1 if friendly, 2 if enemy
    const hasPiece = (x,y,allegiance) =>{
        if(x<0||x>7||y<0||y>7||pieces[x+(8*y)].pieceType=='none'){
            return 0;
        }
        else{
            if(pieces[x+(8*y)].allegiance==allegiance)
                return 1;
            else
                return 2;
        }
    }
    
    const movePiece = (startx,starty,endx,endy) => {
        const pieceHere=pieces[startx+(8*starty)];
        const pieceThere=pieces[endx+(8*endy)];
        //Actually move the piece
        setPiece(endx,endy,pieceHere.pieceType,pieceHere.allegiance);
        setPiece(startx,starty,'none','none');
        //Increment Score on kill
        if(hasPiece(endx,endy,pieceHere.allegiance)==2)
            scoreUpdate(prevScore => prevScore+1);


        //TODO: If player king dies, game over
        if(pieceThere.pieceType=='king'&&pieceThere.allegiance=='p'){
            
        }

        //TODO: If enemy king dies, next stage and increment score

        //If player king onto gold, next stage and increment score
        if(pieceHere.pieceType=='king'&&pieceHere.allegiance=='p'&&pieceThere.blackwhite=='gold'){
            //TODO: Go to next stage
            scoreUpdate(prevScore => prevScore+(10*stageNumber));
            setStageNumber(prevStage => prevStage+1);
            setHasStarted(false);
            newStage();
        }

        
    }

    //PieceMovement is a function describing the abilities of a piece
        //given it's name and position on the board
    //INPUT: ( {"king","queen","rook","knight","bishop","pawn"} , x-coordinate, y-coordinate)
    //OUTPUT: an array of pairs of numbers representing the squares the piece can move to.
    const PieceMovement = (name,x,y,allegiance) => {
        let spaces=[]
        switch(name){
            case 'pawn':
                if(allegiance=='p'){
                    if(hasPiece(x+1,y,allegiance)==0)
                        spaces=[[x+1,y]]
                    if(x==1&&hasPiece(x+2,y,'p')==0)
                        spaces=[...spaces,[x+2,y]]
                    if(hasPiece(x+1,y+1,'p')==2&&y>0)
                        spaces=[...spaces,[x+1,y+1]]
                    if(hasPiece(x+1,y-1,'p')==2&&y<7)
                        spaces=[...spaces,[x+1,y-1]]
                }
                else{
                    if(hasPiece(x-1,y,allegiance)==0)
                        spaces=[[x-1,y]]
                    if(x==6&&hasPiece(x-2,y,'e')==0)
                        spaces=[...spaces,[x-2,y]]
                    if(hasPiece(x-1,y+1,'e')==2&&y>0)
                        spaces=[...spaces,[x-1,y+1]]
                    if(hasPiece(x-1,y-1,'e')==2&&y<7)
                        spaces=[...spaces,[x-1,y-1]]
                }
                break;
            case 'bishop':{
                let collision1=false;
                let collision2=false;
                let collision3=false;
                let collision4=false;
                for(let i=1; i<=8; i++){
                    if(!collision1&&(hasPiece(x-i,y-i,allegiance)!=1)&&!(x-i<0||y-i<0)){
                        if(hasPiece(x-i,y-i,allegiance)==0)
                            spaces=[...spaces,[x-i,y-i]]
                        else{
                            spaces=[...spaces,[x-i,y-i]]
                            collision1=true;
                        }
                    }
                    else{
                        collision1=true;
                    }

                    if(!collision2&&(hasPiece(x-i,y+i,allegiance)!=1)&&!(x-i<0||y+i>7)){
                        if(hasPiece(x-i,y+i,allegiance)==0)
                            spaces=[...spaces,[x-i,y+i]]
                        else{
                            spaces=[...spaces,[x-i,y+i]]
                            collision2=true;
                        }
                    }
                    else{
                        collision2=true;
                    }

                    if(!collision3&&(hasPiece(x+i,y-i,allegiance)!=1)&&!(x+i>7||y-i<0)){
                        if(hasPiece(x+i,y-i,allegiance)==0)
                            spaces=[...spaces,[x+i,y-i]]
                        else{
                            spaces=[...spaces,[x+i,y-i]]
                            collision3=true;
                        }
                    }
                    else{
                        collision3=true;
                    }

                    if(!collision4&&(hasPiece(x+i,y+i,allegiance)!=1)&&!(x+i>7||y+i>7)){
                        if(hasPiece(x+i,y+i,allegiance)==0)
                            spaces=[...spaces,[x+i,y+i]]
                        else{
                            spaces=[...spaces,[x+i,y+i]]
                            collision4=true;
                        }
                    }
                    else{
                        collision4=true;
                    }
                }}
                break;
            case 'knight':
                if((hasPiece(x-1,y-2,allegiance)!=1)&&!(x-1<0||y-2<0)){
                    spaces=[...spaces,[x-1,y-2]]
                }
                if((hasPiece(x-1,y+2,allegiance)!=1)&&!(x-1<0||y+2>7)){
                    spaces=[...spaces,[x-1,y+2]]
                }
                if((hasPiece(x+1,y-2,allegiance)!=1)&&!(x+1>7||y-2<0)){
                    spaces=[...spaces,[x+1,y-2]]
                }
                if((hasPiece(x+1,y+2,allegiance)!=1)&&!(x+1>7||y+2>7)){
                    spaces=[...spaces,[x+1,y+2]]
                }
                if((hasPiece(x-2,y+1,allegiance)!=1)&&!(x-2<0||y+1>7)){
                    spaces=[...spaces,[x-2,y+1]]
                }
                if((hasPiece(x-2,y-1,allegiance)!=1)&&!(x-2<0||y-1<0)){
                    spaces=[...spaces,[x-2,y-1]]
                }
                if((hasPiece(x+2,y-1,allegiance)!=1)&&!(x+2>7||y-1<0)){
                    spaces=[...spaces,[x+2,y-1]]
                }
                if((hasPiece(x+2,y+1,allegiance)!=1)&&!(x+2>7||y+1>7)){
                    spaces=[...spaces,[x+2,y+1]]
                }
                break;
            case 'rook':{
                let collision1=false;
                let collision2=false;
                let collision3=false;
                let collision4=false;
                for(let i=1; i<=8; i++){
                    if(!collision1&&(hasPiece(x-i,y,allegiance)!=1)&&!(x-i<0)){
                        if(hasPiece(x-i,y,allegiance)==0)
                            spaces=[...spaces,[x-i,y]]
                        else{
                            spaces=[...spaces,[x-i,y]]
                            collision1=true;
                        }
                    }
                    else{
                        collision1=true;
                    }

                    if(!collision2&&(hasPiece(x,y+i,allegiance)!=1)&&!(y+i>7)){
                        if(hasPiece(x,y+i,allegiance)==0)
                            spaces=[...spaces,[x,y+i]]
                        else{
                            spaces=[...spaces,[x,y+i]]
                            collision2=true;
                        }
                    }
                    else{
                        collision2=true;
                    }

                    if(!collision3&&(hasPiece(x,y-i,allegiance)!=1)&&!(y-i<0)){
                        if(hasPiece(x,y-i,allegiance)==0)
                            spaces=[...spaces,[x,y-i]]
                        else{
                            spaces=[...spaces,[x,y-i]]
                            collision3=true;
                        }
                    }
                    else{
                        collision3=true;
                    }

                    if(!collision4&&(hasPiece(x+i,y,allegiance)!=1)&&!(x+i>7)){
                        if(hasPiece(x+i,y,allegiance)==0)
                            spaces=[...spaces,[x+i,y]]
                        else{
                            spaces=[...spaces,[x+i,y]]
                            collision4=true;
                        }
                    }
                    else{
                        collision4=true;
                    }
                }}
                break;
            case 'queen':{
                let collision1=false;
                let collision2=false;
                let collision3=false;
                let collision4=false;
                let collision5=false;
                let collision6=false;
                let collision7=false;
                let collision8=false;
                for(let i=1; i<=8; i++){
                    if(!collision1&&(hasPiece(x-i,y-i,allegiance)!=1)&&!(x-i<0||y-i<0)){
                        if(hasPiece(x-i,y-i,allegiance)==0)
                            spaces=[...spaces,[x-i,y-i]]
                        else{
                            spaces=[...spaces,[x-i,y-i]]
                            collision1=true;
                        }
                    }
                    else{
                        collision1=true;
                    }

                    if(!collision2&&(hasPiece(x-i,y+i,allegiance)!=1)&&!(x-i<0||y+i>7)){
                        if(hasPiece(x-i,y+i,allegiance)==0)
                            spaces=[...spaces,[x-i,y+i]]
                        else{
                            spaces=[...spaces,[x-i,y+i]]
                            collision2=true;
                        }
                    }
                    else{
                        collision2=true;
                    }

                    if(!collision3&&(hasPiece(x+i,y-i,allegiance)!=1)&&!(x+i>7||y-i<0)){
                        if(hasPiece(x+i,y-i,allegiance)==0)
                            spaces=[...spaces,[x+i,y-i]]
                        else{
                            spaces=[...spaces,[x+i,y-i]]
                            collision3=true;
                        }
                    }
                    else{
                        collision3=true;
                    }

                    if(!collision4&&(hasPiece(x+i,y+i,allegiance)!=1)&&!(x+i>7||y+i>7)){
                        if(hasPiece(x+i,y+i,allegiance)==0)
                            spaces=[...spaces,[x+i,y+i]]
                        else{
                            spaces=[...spaces,[x+i,y+i]]
                            collision4=true;
                        }
                    }
                    else{
                        collision4=true;
                    }
                    if(!collision5&&(hasPiece(x-i,y,allegiance)!=1)&&!(x-i<0)){
                        if(hasPiece(x-i,y,allegiance)==0)
                            spaces=[...spaces,[x-i,y]]
                        else{
                            spaces=[...spaces,[x-i,y]]
                            collision5=true;
                        }
                    }
                    else{
                        collision5=true;
                    }

                    if(!collision6&&(hasPiece(x,y+i,allegiance)!=1)&&!(y+i>7)){
                        if(hasPiece(x,y+i,allegiance)==0)
                            spaces=[...spaces,[x,y+i]]
                        else{
                            spaces=[...spaces,[x,y+i]]
                            collision6=true;
                        }
                    }
                    else{
                        collision6=true;
                    }

                    if(!collision7&&(hasPiece(x,y-i,allegiance)!=1)&&!(y-i<0)){
                        if(hasPiece(x,y-i,allegiance)==0)
                            spaces=[...spaces,[x,y-i]]
                        else{
                            spaces=[...spaces,[x,y-i]]
                            collision7=true;
                        }
                    }
                    else{
                        collision7=true;
                    }

                    if(!collision8&&(hasPiece(x+i,y,allegiance)!=1)&&!(x+i>7)){
                        if(hasPiece(x+i,y,allegiance)==0)
                            spaces=[...spaces,[x+i,y]]
                        else{
                            spaces=[...spaces,[x+i,y]]
                            collision8=true;
                        }
                    }
                    else{
                        collision8=true;
                    }
                }}
                break;
            case 'king':
                let i=1
                if((hasPiece(x-i,y-i,allegiance)!=1)&&!(x-i<0||y-i<0)){
                    spaces=[...spaces,[x-i,y-i]]
                }
                if((hasPiece(x-i,y+i,allegiance)!=1)&&!(x-i<0||y+i>7)){
                    spaces=[...spaces,[x-i,y+i]]
                }
                if((hasPiece(x+i,y-i,allegiance)!=1)&&!(x+i>7||y-i<0)){
                    spaces=[...spaces,[x+i,y-i]]
                }
                if((hasPiece(x+i,y+i,allegiance)!=1)&&!(x+i>7||y+i>7)){
                    spaces=[...spaces,[x+i,y+i]]
                }
                if((hasPiece(x-i,y,allegiance)!=1)&&!(x-i<0)){
                    spaces=[...spaces,[x-i,y]]
                }

                if((hasPiece(x,y+i,allegiance)!=1)&&!(y+i>7)){
                    spaces=[...spaces,[x,y+i]]
                }

                if((hasPiece(x,y-i,allegiance)!=1)&&!(y-i<0)){
                    spaces=[...spaces,[x,y-i]]
                }
                if((hasPiece(x+i,y,allegiance)!=1)&&!(x+i>7)){
                    spaces=[...spaces,[x+i,y]]
                }
                break;




        }
        return spaces
    }

    const showMovementRange= (x,y) => {
        //console.log(pieces)
        const squaresToAlight=PieceMovement(pieces[x+y*8].pieceType,x,y,pieces[x+y*8].allegiance)
        //Sets the style of those squares to display
        for(let i of squaresToAlight){
            let square=document.getElementById("square"+(i[0]+(8*i[1])))
            square.style.backgroundColor="red"
        }
    }


    const hideMovementRange=(x,y) =>{
        const squaresToDim=PieceMovement(pieces[x+y*8].pieceType,x,y,pieces[x+y*8].allegiance)
        for(let i of squaresToDim){
            let square=document.getElementById("square"+(i[0]+(8*i[1])))
            const _blackwhite=pieces[i[0]+(8*i[1])].blackwhite;
            square.style.backgroundColor=_blackwhite
        }
    }
    
    const handleClick = (x,y) => {
        if(!pieceSelected){
            const square=pieces[x+y*8]
            if(square.pieceType!='none'){
                showMovementRange(x,y)
            }
            setPieceSelected([x,y])
        }
        else{
            const oldx = pieceSelected[0]
            const oldy = pieceSelected[1]
            const moveableSquares=PieceMovement(pieces[oldx+oldy*8].pieceType,oldx,oldy,pieces[oldx+oldy*8].allegiance)
            let matched=false
            for(let i of moveableSquares){
                if(x==i[0]&&y==i[1])
                    matched=true
            }
            if(matched){
                movePiece(oldx,oldy,x,y)
                //setPlayerTurn(false)
            }
            hideMovementRange(oldx,oldy)
            setPieceSelected(false)
        }
    }
    
    
    //Initializes the board if this has not yet been done, or if a new stage is starting
    if(!hasStarted){
        setHasStarted(prevStart=>true)
        if(stageNumber==1){
            initializeBoard()
        }
        else{
           // newStage()
        }
    }
    return (
        <div id="board">
            {
                pieces.map(
                e => {
                    return (<div id={"square"+(e.position[0]+8*e.position[1])} className={e.allegiance+" "+e.blackwhite+" square"} onClick={(() => handleClick(e.position[0],e.position[1]))}>{e.pieceType} {e.allegiance}</div>)
                }
            )}
        </div>
    )
}




export default Board