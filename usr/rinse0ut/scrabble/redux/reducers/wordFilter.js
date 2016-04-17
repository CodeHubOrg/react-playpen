import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const initalWords  = threeLetterWords;
const initialState = {
    letters: [' ', ' ', ' '],
    contains: ' '
}

export const filterWordsByLetters = (words, letters) => {
    return words.filter(item => letters.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

export const filterWordsByContains = (words, contains) => {
    return words.filter(item => item.word.indexOf(contains) !== -1)
}

const defaultLetterOpts = letters.map(item => item.letter)

// Filter letter options based on possible words made with the other selected letter values
export const filterLetterOpts = (letters, opts = defaultLetterOpts, words = initalWords) => {
    let filteredOpts = []
    letters.forEach((letter, pos) => {
        const lettersWithCurrentLetterAsBlank = letters.map((letter, key) => (key === pos) ? ' ' : letter)
        const validWords = filterWordsByLetters(words, lettersWithCurrentLetterAsBlank)
        const validLetters = opts.filter(letter => validWords.some(item => (letter === ' ') ? true : item.word[pos] === letter))
        filteredOpts.push(validLetters)
    })
    return filteredOpts
}

const nextLetter = (current, letters = defaultLetterOpts) => {
    const currentIndex = letters.findIndex(letter => letter === current)
    const nextIndex    = (currentIndex === letters.length - 1) ? 0 : currentIndex + 1
    return letters[nextIndex]
}

const wordFilter = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_WORD_FILTER_LETTER':
            return Object.assign({}, initialState,  {
                letters: state.letters.map((letter, position) => position === action.position ? action.letter : letter)
            })
        case 'UPDATE_WORD_FILTER_CONTAINS':
            return Object.assign({}, initialState, {
                contains: action.letter
            })
        case 'INCREMENT_WORD_FILTER_LETTER':
            return Object.assign({}, initialState, {
                letters: state.letters.map((letter, position) => position === action.position ?
                    nextLetter(state.letters[action.position], action.letterOptions[action.position]) :
                    letter)
            })
        case 'INCREMENT_WORD_FILTER_CONTAINS':
            return Object.assign({}, initialState, {
                contains: nextLetter(state.contains)
            })
        default:
            return state
    }
}

export default wordFilter
