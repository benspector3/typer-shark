import { getWords, shuffle } from "./utils.js";
import Game from "./game.js";

function main() {
    const board = document.querySelector("#board");
    const scoreBoard = document.querySelector("#score-board");
    const missedWordsDisplay = document.querySelector("#missed-words");
    const timer = document.querySelector("#timer")
    const wordForm = document.querySelector("#word-form");
    const wordInput = document.querySelector("#word-input");
    const pauseButton = document.querySelector("button#pause");
    let game;

    
    async function init() {
        const words = await getWords();
        shuffle(words);
        game = new Game(words, board, scoreBoard, timer, missedWordsDisplay);
        
        wordInput.focus();
        wordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            game.submitWord(wordInput.value);
            wordInput.value = '';
            wordInput.focus();
        });
        pauseButton.addEventListener('click', () => {
            game.togglePause();
        })
        
        game.start();
    }
    
    init();

}
main();