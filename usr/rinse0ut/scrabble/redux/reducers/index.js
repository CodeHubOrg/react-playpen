import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';
import { FILTER_WORDS, INCREMENT_LETTER_FILTER, TOGGLE_INCREMENT_LETTER_FILTER } from '../constants/ActionTypes'

const initalWords = threeLetterWords;
const initialState = {
    words: initalWords,
    letterFilter: [' ', ' ', ' '],
    show: false
}

// @todo pass in letter filter
const filterWords = (words, letter, position = null) => {
    return words.filter(item => {
        // console.log(item.word, position, item.word[position], letter, item.word[position] === letter)
        return position !== null ?
            item.word[position] === letter:
            item.word.indexOf(letter) !== 0;
    })
}

export default function letterApp(state = initialState, action) {
  switch (action.type) {
    case FILTER_WORDS:
        const letterFilter = state.letterFilter.slice();
        letterFilter[action.position] = action.letter;
        return Object.assign({}, state, {
            words: filterWords(initalWords, action.letter, action.position),
            letterFilter: letterFilter
        })
    case INCREMENT_LETTER_FILTER:
        const letterIndex       = letters.findIndex(item => item.letter === state.firstLetterFilter)
        const nextLetterIndex   = (letterIndex >= letters.length - 1) ? 0 : letterIndex + 1;
        const firstLetterFilter = letters[nextLetterIndex].letter;

        return Object.assign({}, state, {
            words: initalWords.filter(item => item.word[0] === firstLetterFilter),
            firstLetterFilter: firstLetterFilter
        })
    case TOGGLE_INCREMENT_LETTER_FILTER:
        return Object.assign({}, state, {
            show: !state.show
        })
    default:
      return state
  }
}
