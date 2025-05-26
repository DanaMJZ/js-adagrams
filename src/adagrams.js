//  wave 1
export const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12,
  F: 2, G: 3, H: 2, I: 9, J: 1,
  K: 1, L: 4, M: 2, N: 6, O: 8,
  P: 2, Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1
};
export const drawLetters = () => {
  const letterPool = [];
  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      letterPool.push(letter);
    }
  }
  for (let i = letterPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letterPool[i], letterPool[j]] = [letterPool[j], letterPool[i]];
  }
  return letterPool.slice(0, 10);
};


  

//  wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const availableLetters = [...lettersInHand];
  const inputLetters = input.toUpperCase().split('');
  for (const letter of inputLetters) {
    const index = availableLetters.indexOf(letter);
    if (index === -1) {
      return false; 
    }
    availableLetters.splice(index, 1);
  }
  return true;
};


//  wave 3
export const scoreWord = (word) => {
  if (!word) return 0;
  
  const SCORE_CHART = {
    A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
    D: 2, G: 2,
    B: 3, C: 3, M: 3, P: 3,
    F: 4, H: 4, V: 4, W: 4, Y: 4,
    K: 5,
    J: 8, X: 8,
    Q: 10, Z: 10
  };
  let score = 0;
  const upperWord = word.toUpperCase();
  for (const letter of upperWord) {
    score += SCORE_CHART[letter] || 0;
  }
  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }
  return score;
  
};


//  wave 4
export const highestScoreFrom = (words) => {
  if (!words || words.length === 0) return null;
  
  let highestScore = -1;
  let bestWord = null;
  
  for (const word of words) {
    const currentScore = scoreWord(word);
    
    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestWord = word;
    } 
    else if (currentScore === highestScore) {
      if (bestWord.length === 10) {
        continue;
      } 
      else if (word.length === 10) {
        bestWord = word;
      } 
      else if (word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }
  return {
    word: bestWord,
    score: highestScore
  };
};
