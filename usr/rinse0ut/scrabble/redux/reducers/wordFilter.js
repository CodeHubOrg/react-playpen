import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const alphabet     = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const initalWords  = threeLetterWords;
const initialState = {
    letters: [' ', ' ', ' '],
    wordContains: ' '
}

export const filterWordsByLetterPosition = (words, letters) => {
    return words.filter(item => letters.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

export const filterWordsByLetterInAnyPosition = (words, letter) => {
    return words.filter(item => item.word.indexOf(letter) !== -1)
}

// Filter letter options based on possible words made with the other selected letters values
export const filterLetterOpts = (letters, opts = alphabet, words = initalWords) => {
    let filteredOpts = []
    letters.forEach((letter, pos) => {
        const lettersWithCurrentLetterAsBlank = letters.map((letter, key) => (key === pos) ? ' ' : letter)
        const validWords = filterWordsByLetterPosition(words, lettersWithCurrentLetterAsBlank)
        const validLetters = opts.filter(letter => validWords.some(item => (letter === ' ') ? true : item.word[pos] === letter))
        filteredOpts.push(validLetters)
    })
    return filteredOpts
}

const nextLetter = (current, letters = alphabet) => {
    const currentIndex = letters.findIndex(letter => letter === current)
    const nextIndex    = (currentIndex === letters.length - 1) ? 0 : currentIndex + 1
    return letters[nextIndex]
}

const wordFilter = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_WORDS_BY_LETTER_POSITION':
            return Object.assign({}, state,  {
                letters: state.letters.map((letter, position) => position === action.position ? action.letter : letter),
                wordContains: ' '
            })
        case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
            return Object.assign({}, state, {
                letters: [' ', ' ', ' '],
                wordContains: action.letter
            })
        case 'INCREMENT_LETTER_FILTER':
            return Object.assign({}, state, {
                letters: state.letters.map((letter, position) => position === action.position ?
                    nextLetter(state.letters[action.position], action.letterOptions[action.position]) :
                    letter),
                wordContains: ' '
            })
        case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
            return Object.assign({}, state, {
                letters: [' ', ' ', ' '],
                wordContains: nextLetter(state.wordContains)
            })
        default:
            return state
    }
}

export default wordFilter
