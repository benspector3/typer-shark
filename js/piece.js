export default class Piece {
    constructor(board, word, speed = 5) {
        this.board = board;
        this.word = word;
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.speed = speed;
        this.element = document.createElement('div');
        this.element.className = 'piece';
        this.element.innerHTML = `
            <p>${word}</p>
        `
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
        const startingX = startingDirection > 0 
            ? 0 - this.element.clientWidth
            : this.board.clientWidth;
        const startingY = Math.random() * this.board.clientHeight;
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
        const trueX = Number(this.element.style.left.slice(0, -2));
        if (trueX < -this.element.clientWidth || trueX > this.board.clientWidth) {
            return true;
        }
    }
}