import { fetchLoggedInUser, setNav } from "../scripts/global.js";
import { getWords, shuffle } from "./js/utils.js";
import Game from "./js/game.js";

async function main() {

    const user = await fetchLoggedInUser();
    if (!user) return window.location.assign('/login.html');
    setNav(true);


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
        game.nextWord();
        
        wordInput.focus();
        wordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            game.submitWord(wordInput.value);
            wordInput.value = '';
            wordInput.focus();
        });
        pauseButton.addEventListener('click', () => {
            if (game.isOver) {
                // init();
                alert('refresh the page to play again')
                return;
            }
            game.togglePause();
            pauseButton.innerText = game.isOver ? 'Play Again!' : game.isPaused ? 'Start' : 'Pause';
            wordInput.focus();
        })
    }
    
    init();

}
main();