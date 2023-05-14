export async function doFetch(url, options) {
    try {
        const r = await fetch(url, options);
        const data = r.text();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getWords = async () => {
    let words = await doFetch('./game/static/wordlist.txt');
    words = words.split('\n')
    return words
}

// in-place shuffle
export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}