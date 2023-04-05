
import PieceMovement from "./PieceMovement";

//Algorithm uses alpha-beta pruning of 
//RETURN: An quadruplet [oldx,oldy,newx,newy] that describes which
    //piece should be moved to which location.
function MoveAI(difficulty, board){
    //Used in the Alpha-Beta-Pruning algorithm
    let alpha=-100000;
    let beta=100000;

    //Credit to the chess programming wiki at https://www.chessprogramming.org/Simplified_Evaluation_Function
        //for the values of pieces and the location matrices.
    //RETURN: The value(for enemy pieces) of the piece at x,y
    const valuePieceAt = (x,y) =>{
        let locationMatrix=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let pieceValue=0;
        //A case statement which sets locationMatrix depending on the type of piece, and the value of the piece.
        switch(board[x+8*y].pieceType){
            case 'pawn':
                locationMatrix=[
                    0,5,5,0,5,10,50,0,
                    0,10,-5,0,5,10,50,0,
                    0,10,-10,0,10,20,50,0,
                    0,-20,0,20,25,30,50,0,
                    0,-20,0,20,25,40,50,0,
                    0,10,-10,0,10,20,50,0,
                    0,10,-5,0,5,10,50,0,
                    0,5,5,0,5,10,50,0
                ];
                pieceValue=100;
                break;
            case 'bishop':
                locationMatrix=[
                    -20,-10,-10,-10,-10,-10,-10,-20,
                    -10,0,0,0,0,0,0,-10,
                    -10,0,5,10,10,5,0,-10,
                    -10,5,5,10,10,5,5,-10,
                    -10,0,10,10,10,10,10,-10,
                    -10,5,0,0,0,0,5,-10,
                    -20,-10,-10,-10,-10,-10,-10,-20
                ];
                pieceValue=330;
                break;
            case 'knight':
                locationMatrix=[
                    -50,-40,-30,-30,-30,-30,-40,-50,
                    -40,-20,0,0,0,0,-20,-40,
                    -30,0,10,15,15,10,0,-30,
                    -30,5,15,20,20,15,5,-30,
                    -30,0,15,20,20,15,0,-30,
                    -30,5,10,15,15,10,5,-30,
                    -40,-20,0,5,5,0,-20,-40,
                    -50,-40,-30,-30,-30,-30,-40,-50,
                ];
                pieceValue=320;
                break;
            case 'rook':
                locationMatrix=[
                    0,-5,-5,-5,-5,-5,5,0,
                    0,0,0,0,0,0,10,0,
                    0,0,0,0,0,0,10,0,
                    5,0,0,0,0,0,10,0,
                    5,0,0,0,0,0,10,0,
                    0,0,0,0,0,0,10,0,
                    0,0,0,0,0,0,10,0,
                    0,-5,-5,-5,-5,-5,5,0,
                ];
                pieceValue=500;
                break;
            case 'queen':
                locationMatrix=[
                    -20,-10,-10,0,-5,-10,-10,-20,
                    -10,0,5,0,0,0,0,-10,
                    -10,5,5,5,5,5,0,-10,
                    -5,0,5,5,5,5,0,-5,
                    -5,0,5,5,5,5,0,-5,
                    -10,0,5,5,5,5,0,-10,
                    -10,0,0,0,0,0,0,-10,
                    -20,-10,-10,-5,-5,-10,-10,-20,
                ];
                pieceValue=900;
                break;
            case 'king':
                locationMatrix=[
                    20,20,-10,-20,-30,-30,-30,-30,
                    30,20,-20,-30,-40,-40,-40,-40,
                    10,0,-20,-30,-40,-40,-40,-40,
                    0,0,-20,-40,-50,-50,-50,-50,
                    0,0,-20,-40,-50,-50,-50,-50,
                    10,0,-20,-30,-40,-40,-40,-40,
                    30,20,-20,-30,-40,-40,-40,-40,
                    20,20,-10,-20,-30,-30,-30,-30,
                ];
                pieceValue=20000;
                break;
        }

        let allegianceSign=1;
        if(board[x+8*y].allegiance=='p')
            allegianceSign=-1;
        let matrixLocation=(allegianceSign==-1) ? (x+8*y) : ((7-x)+8*y);
        //console.log((pieceValue+locationMatrix[matrixLocation])*allegianceSign)
        return (pieceValue+locationMatrix[matrixLocation])*allegianceSign;
    }

    
    //RETURN: The comparative strength of each side of the board at each stage
        //A desirable outcome for the cpu player.
    const valuation = () =>{
        let total=0;
        for(let x=0; x<8; x++){
            for(let y=0; y<8; y++){
                //console.log(total);
                total=total+valuePieceAt(x,y);
            }
        }
        console.log("points on board:"+total);
        return total;
    }

    //Updates the board with the new move
    //RETURN: None
    const movePiece = (move,_type,_allegiance) =>{
        board[move[1][0]+8*move[1][1]]=board[move[0][0]+8*move[0][1]];
        board[move[0][0]+8*move[0][1]]={ pieceType: _type, allegiance: _allegiance, position: [move[0][0], move[0][1]] };
    }


    //RETURN: Pairs of coordinates corresponding to every possible move by the given player
    const getAllMoves = (_allegiance)=>{
        console.log(board);
        let moves=[];
        for(let x=0; x<8; x++){
            for(let y=0; y<8; y++){
                if(board[x+8*y].allegiance==_allegiance){
                    const movesToAdd=PieceMovement(board[x+8*y].pieceType,x,y,board);
                    for(let move of movesToAdd){
                        moves.push([[x,y],[move]]);
                    }
                }
            }
        }
        return moves;

    }
   
/*
    //Augmented from the template at https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
    const alphaBetaMax = (a,b,depthLeft) =>{
        if(depthLeft==0){
            //console.log('valueMAX:'+valuation());
            return [valuation(),[[0,0],[0,0]]];
        }
        for(let move of getAllMoves('e')){
            let oldPiece=board[move[1][0][0]+8*move[1][0][1]];
            movePiece([move[0],move[1][0]],'none','none');
            let score=alphaBetaMin(a,b,depthLeft-1,board);
            console.log("score in max:"+score);
            movePiece([move[1][0],move[0]],oldPiece.pieceType,oldPiece.allegiance);
            if(score >= b)
                return b;
            if(score > a[0]){
                console.log("override with score "+score);
                a=[score,[move[0],move[1][0]]];
            }
        }
        return a;
    }

    const alphaBetaMin = (a,b,depthLeft) =>{
        if(depthLeft==0){
            //console.log('valueMIN:'+valuation());
            return valuation();
        }
        for(let move of getAllMoves('p')){
            let oldPiece=board[move[1][0][0]+8*move[1][0][1]];
            movePiece([move[0],move[1][0]],'none','none');
            let score=alphaBetaMax(a,b,depthLeft-1,board)[0];
            console.log("score in min:"+score);
            movePiece([move[1][0],move[0]],oldPiece.pieceType,oldPiece.allegiance);
            if(score <= a[0])
                return a[0];
            if(score < b)
                b=score;
        }
        return b;

    }

    let toReturn=alphaBetaMax([alpha,[[0,0],[0,0]]],beta,difficulty);
    console.log(toReturn);
    return toReturn;
*/   
    const alphaBetaRoot = (depth,isMaximisingPlayer) =>{
        const moves=getAllMoves('e');
        let bestMoveValue=-9999
        let bestMove=[[0,0],[0,0]];

        for(let move of moves){
            console.log(move);
            const oldPiece=board[move[1][0][0]+8*move[1][0][1]];
            movePiece([move[0],move[1][0]],'none','none');
            let score=alphaBeta(depth-1,-100000,100000,!isMaximisingPlayer);
            console.log("score in root:"+score);
            movePiece([move[1][0],move[0]],oldPiece.pieceType,oldPiece.allegiance);
            if(score>=bestMoveValue){
                bestMoveValue=score;
                bestMove=[move[0],move[1][0]];
            }
        }
        return bestMove;
    }
    
    const alphaBeta = (depth,alpha,beta,isMaximisingPlayer) =>{
        if(depth===0){
            return -valuation();
        }

        //////////Case for the enemy side
        if(isMaximisingPlayer){
            const moves=getAllMoves('e');
            //console.log(moves);
            let bestMoveValue=-9999;
            for(let move of moves){
                
                const oldPiece=board[move[1][0][0]+8*move[1][0][1]];
                movePiece([move[0],move[1][0]],'none','none');
                bestMoveValue=Math.max(bestMoveValue,alphaBeta(depth-1,alpha,beta,!isMaximisingPlayer));
                console.log("score in max:"+bestMoveValue);
                movePiece([move[1][0],move[0]],oldPiece.pieceType,oldPiece.allegiance);
                alpha=Math.max(alpha, bestMoveValue);
                if(beta<=alpha)
                    return bestMoveValue;
            }
            return bestMoveValue;
        }
        //////////Case for the player side
        else{
            const moves=getAllMoves('p');
            //console.log(moves);
            let bestMoveValue=9999;
            for(let move of moves){
                console.log(move);
                const oldPiece=board[move[1][0][0]+8*move[1][0][1]];
                movePiece([move[0],move[1][0]],'none','none');
                bestMoveValue=Math.min(bestMoveValue,alphaBeta(depth-1,alpha,beta,!isMaximisingPlayer));
                console.log("score in min:"+bestMoveValue);
                movePiece([move[1][0],move[0]],oldPiece.pieceType,oldPiece.allegiance);
                beta=Math.min(beta,bestMoveValue);
                if(beta<=alpha)
                    return bestMoveValue;
            }
            return bestMoveValue;
        }
        //////////
    }
    let moveToReturn=alphaBetaRoot(difficulty,true);
    console.log(moveToReturn);
    return moveToReturn;

}

export default MoveAI;