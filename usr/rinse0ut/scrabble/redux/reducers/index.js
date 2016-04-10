import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';
import { FILTER_WORD, INCREMENT_LETTER_FILTER, TOGGLE_INCREMENT_LETTER_FILTER } from '../constants/ActionTypes'

const initialState = {
    words: threeLetterWords,
    firstLetterFilter: ' ',
    show: false
}

const initalWords = twoLetterWords;

export default function letterApp(state = initialState, action) {
  switch (action.type) {
    case FILTER_WORD:
        return Object.assign({}, state, {
            words: initalWords.filter(item => item.word[0] === action.letter),
            firstLetterFilter: action.letter
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
