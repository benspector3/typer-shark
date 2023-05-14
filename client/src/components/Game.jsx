import { useState, useEffect } from 'react';

export async function doFetch(url, options) {
    try {
        const r = await fetch(url, options);
        const data = r.text();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export default function Game() {

    const [ score, setScore ] = useState(0);
    const [ words, setWords ] = useState([]);
    const [intervalIdx, setIntervalIdx] = useState(0)

    console.log(words);

    useEffect(() => {
        const getWords = async () => {
            let words = await doFetch('./wordlist.txt');
            words = words.split('\n')
            setWords(words);
        }
        getWords();
    }, []);

    return (
        <div id='game'>
        </div>
    );
    

}