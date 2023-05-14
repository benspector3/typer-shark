import Piece from './piece.js'

const MAX_TIME = 60;

export default class Game {
    constructor(words, board, scoreBoard, timer, missedWordsDisplay) {
        this.words = words;
        this.score = 0;
        this.missedWords = 0;
        this.pieces = []
        this.board = board;
        this.scoreBoard = scoreBoard;
        this.timer = timer;
        this.missedWordsDisplay = missedWordsDisplay;
        this.updateInterval = null;
        this.newWordInterval = null;
        this.timerInterval = null;
        this.time = MAX_TIME;
        this.isPaused = false;
        this.isOver = false;
    }

    nextWord() {
        const speed = 5 + (Math.random() * 5)

        const newPiece = new Piece(board, this.words.pop(), speed)
        this.pieces.push(newPiece)
        
        newPiece.setStartingPosition();

        this.board.append(newPiece.element);
        return newPiece;
    }

    submitWord(word) {
        const matchingPieceIdx = this.pieces.findIndex(piece => piece.word === word);
        if (matchingPieceIdx < 0) return;
        const matchingPiece = this.pieces[matchingPieceIdx]
        this.pieces.splice(matchingPieceIdx, 1)
        matchingPiece.element.remove();
        this.nextWord();
        this.score++;
        this.scoreBoard.innerText = this.score;
    }

    movePieces() {
        let indexesToRemove = [];
        this.pieces.forEach((piece, i) => {
            piece.move();
            if (piece.isInBounds()) {
                piece.remove();
                indexesToRemove.push(i);
                this.missedWords++;
                this.missedWordsDisplay.innerText = this.missedWords;
            }
        });
        indexesToRemove.forEach(i => this.pieces.splice(i, 1))
    }

    startTimers() {
        this.updateInterval = setInterval(this.update.bind(this), 50);
        this.newWordInterval = setInterval(this.nextWord.bind(this), 3000);
        this.timerInterval = setInterval(this.timerTick.bind(this), 1000);
    }

    stopTimers() {
        clearInterval(this.updateInterval);
        clearInterval(this.newWordInterval);
        clearInterval(this.timerInterval);
        this.updateInterval = null;
        this.newWordInterval = null;
        this.timerInterval = null;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.stopTimers();
        } else {
            this.startTimers();
        }
    }

    start() {
        this.nextWord();
        this.timer.innerText = MAX_TIME;
        this.startTimers();
    }

    end() {
        this.stopTimers();
    }

    update() {
        if (this.isPaused) return;
        if (this.isOver) return;
        this.movePieces();
    }

    timerTick() {
        this.time--;
        this.timer.innerText = this.time;
        if (this.time === 0) {
            this.isOver = true;
            this.end();
        }
    }
}