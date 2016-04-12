import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';
import { FILTER_WORDS_BY_LETTER_POSITION, FILTER_WORDS_BY_LETTER_IN_ANY_POSITION, INCREMENT_LETTER_FILTER, INCREMENT_LETTER_IN_ANY_POSITION_FILTER, TOGGLE_INCREMENT_LETTER_FILTER } from '../constants/ActionTypes'

const initalWords = threeLetterWords;
const initialState = {
    words: initalWords,
    letterFilter: [' ', ' ', ' '],
    // letterOptions: [letters, letters, letters],
    wordContains: null,
    show: false
}

const filterWordsByLetterPosition = (words, letterFilter) => {
    return words.filter(item => {
        return letterFilter.every((letter, position) => {
            // console.log(item.word, position, letter, item.word[position], letter === item.word[position])
            return (letter === ' ') ? true : item.word[position] === letter
        })
    })
}

const filterWordsByLetterInAnyPosition = (words, letter) => words.filter(item => item.word.indexOf(letter) !== -1)

export default function letterApp(state = initialState, action) {
  let letterFilter = state.letterFilter.slice()
  let letterIndex = null;
  let nextLetterIndex = null;
  switch (action.type) {
    case FILTER_WORDS_BY_LETTER_POSITION:
        letterFilter[action.position] = action.letter;
        return Object.assign({}, state, {
            words: filterWordsByLetterPosition(initalWords, letterFilter),
            letterFilter: letterFilter,
            wordContains: ' '
        })
    case FILTER_WORDS_BY_LETTER_IN_ANY_POSITION:
        console.log(FILTER_WORDS_BY_LETTER_IN_ANY_POSITION);
        return Object.assign({}, state, {
            words: filterWordsByLetterInAnyPosition(initalWords, action.letter),
            letterFilter: [' ', ' ', ' '],
            wordContains: action.letter
        })
    case INCREMENT_LETTER_FILTER:
        letterIndex       = letters.findIndex(item => item.letter === state.letterFilter[action.position]);
        nextLetterIndex   = (letterIndex >= letters.length - 1) ? 0 : letterIndex + 1;
        letterFilter[action.position] = letters[nextLetterIndex].letter;

        return Object.assign({}, state, {
            words: filterWordsByLetterPosition(initalWords, letterFilter),
            letterFilter: letterFilter,
            wordContains: ' '
        })
    case INCREMENT_LETTER_IN_ANY_POSITION_FILTER:
        console.log(INCREMENT_LETTER_IN_ANY_POSITION_FILTER);
        letterIndex     = letters.findIndex(item => item.letter === state.wordContains);
        nextLetterIndex = (letterIndex >= letters.length - 1) ? 0 : letterIndex + 1;
        const wordContains    = letters[nextLetterIndex].letter;

        return Object.assign({}, state, {
            words: filterWordsByLetterInAnyPosition(initalWords, wordContains),
            letterFilter: [' ', ' ', ' '],
            wordContains: wordContains
        })
    case TOGGLE_INCREMENT_LETTER_FILTER:
        return Object.assign({}, state, {
            show: !state.show
        })
    default:
      return state
  }
}
