
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

    }

    
    //RETURN: The comparative strength of each side of the board at each stage
        //A desirable outcome for the cpu player.
    const valuation = () =>{

    }

    //Updates the board with the new move
    //RETURN: None
    const movePiece = (move,_type,_allegiance) =>{
        board[move[1][0]+move[1][1]]=board[move[0][0]+move[0][1]];
        board[move[0][0]+move[0][1]]={ pieceType: _type, allegiance: _allegiance, position: [move[0][0], move[0][1]] };
    }


    //RETURN: Pairs of coordinates corresponding to every possible move by the given player
    const getAllMoves = (_allegiance)=>{
        let moves=[];
        for(let x=0; x<8; x++){
            for(let y=0; y<8; y++){
                if(board[x+8*y].allegiance==_allegiance){
                    movesToAdd=PieceMovement(board[x+8*y].pieceType,x,y,board);
                    for(let move of movesToAdd){
                        moves.push([[x,y],[move]]);
                    }
                }
            }
        }
        return moves;

    }

    //Augmented from the template at https://www.chessprogramming.org/Alpha-Beta
    const alphaBetaMax = (a,b,depthLeft) =>{
        if(depthLeft==0)
            return valuation();
        for(let move of getAllMoves('e')){
            oldPiece=board[[move[1][0]+8*move[1][1]]];
            movePiece([move[0],move[1]],'none','none');
            score=alphaBetaMin(a,b,depthLeft-1);
            movePiece([move[1],move[0]],oldPiece.pieceType,oldPiece.allegiance);
            if(score >= b)
                return b;
            if(score > a)
                a=[score,move];
        }
        return a;
    }

    const alphaBetaMin = (a,b,depthLeft) =>{
        if(depthLeft==0)
            return valuation();
        for(let move of getAllMoves('p')){
            oldPiece=board[[move[1][0]+8*move[1][1]]];
            movePiece([move[0],move[1]],'none','none');
            score=alphaBetaMax(a,b,depthLeft-1)[0];
            movePiece([move[1],move[0]],oldPiece.pieceType,oldPiece.allegiance);
            if(score <= a)
                return a;
            if(score < a)
                b=score;
        }
        return a;

    }

    return alphaBetaMax(alpha,beta,difficulty)[1];
}

export default MoveAI;