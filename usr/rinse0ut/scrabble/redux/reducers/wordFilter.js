import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const initialState = {
    letters: [' ', ' ', ' '],
    contains: ' '
}
const initalWords  = threeLetterWords;

const letterisInWordPosition = (letter, word, position) => letter === ' ' ? true : word[position] === letter

const wordContains = (word, letter) => word.indexOf(letter) !== -1

const defaultLetterOpts = letters.map(item => item.letter)

export const filterWordsByLetters = (words, letters) => {
    return words.filter(item => letters.every((letter, position) => letterisInWordPosition(letter, item.word, position)))
}

export const filterWordsByContains = (words, contains) => {
    return words.filter(item => wordContains(item.word, contains))
}

// Filter letter options based on possible words made with the other selected letter values
export const filterLetterOpts = (letters, opts = defaultLetterOpts, words = initalWords) => {
    let filteredOpts = []
    letters.forEach((letter, position) => {
        const lettersWithCurrentLetterAsBlank = letters.map((letter, key) => (key === position) ? ' ' : letter)
        const validWords = filterWordsByLetters(words, lettersWithCurrentLetterAsBlank)
        const validLetters = opts.filter(letter => validWords.some(item => letterisInWordPosition(letter, item.word, position)))
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
