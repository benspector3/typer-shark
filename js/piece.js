export default class Piece {
    constructor(board, word, speed = 4) {
        this.board = board;
        this.word = word;
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.speed = speed;
        this.element = document.createElement('div');
        this.element.className = 'piece';
        this.addPieceToBoard();
    }

    addPieceToBoard() {
        this.board.append(this.element);
    }

    move() {
        this.position(this.x + this.speed * this.directionX, this.y);
    }

    remove() {
        this.element.remove();
    }

    reverse() {
        this.directionX *= -1;
    }

    setStartingPosition() {
        const startingDirection = Math.random() > 0.5 ? 1 : -1;

        this.element.innerHTML = `
            <p>${this.word}</p>
            <img src='./static/shark-${startingDirection === -1 ? 'left' : 'right'}.png'>
        `
        const boardData = this.board.getBoundingClientRect();
        const startingX = startingDirection > 0 
            ? boardData.x - this.element.clientWidth
            : boardData.x  + boardData.width;
        const startingY = boardData.y + Math.random() * boardData.height;
        this.position(startingX, startingY, startingDirection);
    }
    
    position(x, y, direction = this.directionX) {
        this.x = x;
        this.y = y;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.directionX = direction;
    }

    isInBounds() {
        const boardData = this.board.getBoundingClientRect();
        const trueX = Number(this.element.style.left.slice(0, -2));
        if (trueX <= -this.element.clientWidth || trueX >= boardData.x + boardData.width) {
            return true;
        }
    }
}