    //PieceMovement is a function describing the abilities of a piece
    //given it's name and position on the board
    //INPUT: {"king","queen","rook","knight","bishop","pawn"} , x-coordinate, y-coordinate, allegiance of the piece, and an array representing the board.
    //RETURN: an array of pairs of numbers representing the squares the piece can move to.
    function PieceMovement(name, x, y,board){
        let allegiance=board[x+8*y].allegiance;
        
        //Evaluates the occupation of a given square relative to a selected piece.
        //INPUT: x- and y-coordinates to be investigated, the allegiance of
            //the input piece, and an array representing the board.
        //RETURN: 0 if none, 1 if friendly, 2 if enemy
        const hasPiece = (x,y,allegiance,board) =>{
            if (x < 0 || x > 7 || y < 0 || y > 7 || board[x + (8 * y)].pieceType == 'none') {
                return 0;
            }
            else {
                if (board[x + (8 * y)].allegiance == allegiance){
                    return 1;
                }
                else{
                    return 2;
                }
            }
        }
        
        let spaces = []
        switch (name) {
            case 'pawn':
                if (allegiance == 'p') {
                    if (hasPiece(x + 1, y, allegiance, board) == 0)
                        spaces = [[x + 1, y]]
                    if (x == 1 && hasPiece(x + 2, y, 'p', board) == 0)
                        spaces = [...spaces, [x + 2, y]]
                    if ((hasPiece(x + 1, y + 1, 'p', board) === 2 )&& (y <7)){
                        spaces = [...spaces, [x + 1, y + 1]]
                    }
                    if ((hasPiece(x + 1, y - 1, 'p', board) === 2 )&&( y >0)){
                        spaces = [...spaces, [x + 1, y - 1]]
                    }
                }
                else {
                    if (hasPiece(x - 1, y, allegiance, board) == 0)
                        spaces = [[x - 1, y]]
                    if (x == 6 && hasPiece(x - 2, y, 'e',board) == 0)
                        spaces = [...spaces, [x - 2, y]]
                    if (hasPiece(x - 1, y + 1, 'e',board) == 2 && y <7)
                        spaces = [...spaces, [x - 1, y + 1]]
                    if (hasPiece(x - 1, y - 1, 'e',board) == 2 && y >0)
                        spaces = [...spaces, [x - 1, y - 1]]
                }
                break;
            case 'bishop': {
                let collision1 = false;
                let collision2 = false;
                let collision3 = false;
                let collision4 = false;
                for (let i = 1; i <= 8; i++) {
                    if (!collision1 && (hasPiece(x - i, y - i, allegiance, board) != 1) && !(x - i < 0 || y - i < 0)) {
                        if (hasPiece(x - i, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y - i]]
                        else {
                            spaces = [...spaces, [x - i, y - i]]
                            collision1 = true;
                        }
                    }
                    else {
                        collision1 = true;
                    }

                    if (!collision2 && (hasPiece(x - i, y + i, allegiance, board) != 1) && !(x - i < 0 || y + i > 7)) {
                        if (hasPiece(x - i, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y + i]]
                        else {
                            spaces = [...spaces, [x - i, y + i]]
                            collision2 = true;
                        }
                    }
                    else {
                        collision2 = true;
                    }

                    if (!collision3 && (hasPiece(x + i, y - i, allegiance, board) != 1) && !(x + i > 7 || y - i < 0)) {
                        if (hasPiece(x + i, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y - i]]
                        else {
                            spaces = [...spaces, [x + i, y - i]]
                            collision3 = true;
                        }
                    }
                    else {
                        collision3 = true;
                    }

                    if (!collision4 && (hasPiece(x + i, y + i, allegiance, board) != 1) && !(x + i > 7 || y + i > 7)) {
                        if (hasPiece(x + i, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y + i]]
                        else {
                            spaces = [...spaces, [x + i, y + i]]
                            collision4 = true;
                        }
                    }
                    else {
                        collision4 = true;
                    }
                }
            }
                break;
            case 'knight':
                if ((hasPiece(x - 1, y - 2, allegiance, board) != 1) && !(x - 1 < 0 || y - 2 < 0)) {
                    spaces = [...spaces, [x - 1, y - 2]]
                }
                if ((hasPiece(x - 1, y + 2, allegiance, board) != 1) && !(x - 1 < 0 || y + 2 > 7)) {
                    spaces = [...spaces, [x - 1, y + 2]]
                }
                if ((hasPiece(x + 1, y - 2, allegiance, board) != 1) && !(x + 1 > 7 || y - 2 < 0)) {
                    spaces = [...spaces, [x + 1, y - 2]]
                }
                if ((hasPiece(x + 1, y + 2, allegiance, board) != 1) && !(x + 1 > 7 || y + 2 > 7)) {
                    spaces = [...spaces, [x + 1, y + 2]]
                }
                if ((hasPiece(x - 2, y + 1, allegiance, board) != 1) && !(x - 2 < 0 || y + 1 > 7)) {
                    spaces = [...spaces, [x - 2, y + 1]]
                }
                if ((hasPiece(x - 2, y - 1, allegiance, board) != 1) && !(x - 2 < 0 || y - 1 < 0)) {
                    spaces = [...spaces, [x - 2, y - 1]]
                }
                if ((hasPiece(x + 2, y - 1, allegiance, board) != 1) && !(x + 2 > 7 || y - 1 < 0)) {
                    spaces = [...spaces, [x + 2, y - 1]]
                }
                if ((hasPiece(x + 2, y + 1, allegiance, board) != 1) && !(x + 2 > 7 || y + 1 > 7)) {
                    spaces = [...spaces, [x + 2, y + 1]]
                }
                break;
            case 'rook': {
                let collision1 = false;
                let collision2 = false;
                let collision3 = false;
                let collision4 = false;
                for (let i = 1; i <= 8; i++) {
                    if (!collision1 && (hasPiece(x - i, y, allegiance, board) != 1) && !(x - i < 0)) {
                        if (hasPiece(x - i, y, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y]]
                        else {
                            spaces = [...spaces, [x - i, y]]
                            collision1 = true;
                        }
                    }
                    else {
                        collision1 = true;
                    }

                    if (!collision2 && (hasPiece(x, y + i, allegiance, board) != 1) && !(y + i > 7)) {
                        if (hasPiece(x, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x, y + i]]
                        else {
                            spaces = [...spaces, [x, y + i]]
                            collision2 = true;
                        }
                    }
                    else {
                        collision2 = true;
                    }

                    if (!collision3 && (hasPiece(x, y - i, allegiance, board) != 1) && !(y - i < 0)) {
                        if (hasPiece(x, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x, y - i]]
                        else {
                            spaces = [...spaces, [x, y - i]]
                            collision3 = true;
                        }
                    }
                    else {
                        collision3 = true;
                    }

                    if (!collision4 && (hasPiece(x + i, y, allegiance, board) != 1) && !(x + i > 7)) {
                        if (hasPiece(x + i, y, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y]]
                        else {
                            spaces = [...spaces, [x + i, y]]
                            collision4 = true;
                        }
                    }
                    else {
                        collision4 = true;
                    }
                }
            }
                break;
            case 'queen': {
                let collision1 = false;
                let collision2 = false;
                let collision3 = false;
                let collision4 = false;
                let collision5 = false;
                let collision6 = false;
                let collision7 = false;
                let collision8 = false;
                for (let i = 1; i <= 8; i++) {
                    if (!collision1 && (hasPiece(x - i, y - i, allegiance, board) != 1) && !(x - i < 0 || y - i < 0)) {
                        if (hasPiece(x - i, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y - i]]
                        else {
                            spaces = [...spaces, [x - i, y - i]]
                            collision1 = true;
                        }
                    }
                    else {
                        collision1 = true;
                    }

                    if (!collision2 && (hasPiece(x - i, y + i, allegiance, board) != 1) && !(x - i < 0 || y + i > 7)) {
                        if (hasPiece(x - i, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y + i]]
                        else {
                            spaces = [...spaces, [x - i, y + i]]
                            collision2 = true;
                        }
                    }
                    else {
                        collision2 = true;
                    }

                    if (!collision3 && (hasPiece(x + i, y - i, allegiance, board) != 1) && !(x + i > 7 || y - i < 0)) {
                        if (hasPiece(x + i, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y - i]]
                        else {
                            spaces = [...spaces, [x + i, y - i]]
                            collision3 = true;
                        }
                    }
                    else {
                        collision3 = true;
                    }

                    if (!collision4 && (hasPiece(x + i, y + i, allegiance, board) != 1) && !(x + i > 7 || y + i > 7)) {
                        if (hasPiece(x + i, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y + i]]
                        else {
                            spaces = [...spaces, [x + i, y + i]]
                            collision4 = true;
                        }
                    }
                    else {
                        collision4 = true;
                    }
                    if (!collision5 && (hasPiece(x - i, y, allegiance, board) != 1) && !(x - i < 0)) {
                        if (hasPiece(x - i, y, allegiance, board) == 0)
                            spaces = [...spaces, [x - i, y]]
                        else {
                            spaces = [...spaces, [x - i, y]]
                            collision5 = true;
                        }
                    }
                    else {
                        collision5 = true;
                    }

                    if (!collision6 && (hasPiece(x, y + i, allegiance, board) != 1) && !(y + i > 7)) {
                        if (hasPiece(x, y + i, allegiance, board) == 0)
                            spaces = [...spaces, [x, y + i]]
                        else {
                            spaces = [...spaces, [x, y + i]]
                            collision6 = true;
                        }
                    }
                    else {
                        collision6 = true;
                    }

                    if (!collision7 && (hasPiece(x, y - i, allegiance, board) != 1) && !(y - i < 0)) {
                        if (hasPiece(x, y - i, allegiance, board) == 0)
                            spaces = [...spaces, [x, y - i]]
                        else {
                            spaces = [...spaces, [x, y - i]]
                            collision7 = true;
                        }
                    }
                    else {
                        collision7 = true;
                    }

                    if (!collision8 && (hasPiece(x + i, y, allegiance, board) != 1) && !(x + i > 7)) {
                        if (hasPiece(x + i, y, allegiance, board) == 0)
                            spaces = [...spaces, [x + i, y]]
                        else {
                            spaces = [...spaces, [x + i, y]]
                            collision8 = true;
                        }
                    }
                    else {
                        collision8 = true;
                    }
                }
            }
                break;
            case 'king':
                let i = 1
                if ((hasPiece(x - i, y - i, allegiance, board) != 1) && !(x - i < 0 || y - i < 0)) {
                    spaces = [...spaces, [x - i, y - i]]
                }
                if ((hasPiece(x - i, y + i, allegiance, board) != 1) && !(x - i < 0 || y + i > 7)) {
                    spaces = [...spaces, [x - i, y + i]]
                }
                if ((hasPiece(x + i, y - i, allegiance, board) != 1) && !(x + i > 7 || y - i < 0)) {
                    spaces = [...spaces, [x + i, y - i]]
                }
                if ((hasPiece(x + i, y + i, allegiance, board) != 1) && !(x + i > 7 || y + i > 7)) {
                    spaces = [...spaces, [x + i, y + i]]
                }
                if ((hasPiece(x - i, y, allegiance, board) != 1) && !(x - i < 0)) {
                    spaces = [...spaces, [x - i, y]]
                }

                if ((hasPiece(x, y + i, allegiance, board) != 1) && !(y + i > 7)) {
                    spaces = [...spaces, [x, y + i]]
                }

                if ((hasPiece(x, y - i, allegiance, board) != 1) && !(y - i < 0)) {
                    spaces = [...spaces, [x, y - i]]
                }
                if ((hasPiece(x + i, y, allegiance, board) != 1) && !(x + i > 7)) {
                    spaces = [...spaces, [x + i, y]]
                }
                break;




        }
        return spaces
    }

export default PieceMovement;