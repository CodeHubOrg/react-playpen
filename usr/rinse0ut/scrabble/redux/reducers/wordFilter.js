import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const alphabet     = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const initalWords  = threeLetterWords;
const initialState = {
    letterValues: [' ', ' ', ' '],
    // letterOptions: [alphabet, alphabet, alphabet],
    wordContains: ' '
}

export const filterWordsByLetterPosition = (words, letterValues) => {
    return words.filter(item => letterValues.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

export const filterWordsByLetterInAnyPosition = (words, letter) => {
    return words.filter(item => item.word.indexOf(letter) !== -1)
}

// Filter letter options based on possible words made with the other options
export const filterLetterOpts = (letterValues, opts = alphabet, words = initalWords) => {
    let filteredOpts = []
    letterValues.forEach((letter, pos) => {
        let newletterValues = letterValues.slice()
        newletterValues[pos] = ' '
        const filteredWords = filterWordsByLetterPosition(words, newletterValues)
        filteredOpts.push(opts.filter(letter => filteredWords.some(item => (letter === ' ') ? true : item.word[pos] === letter)))
    })
    return filteredOpts
}

const nextLetter = (current, letters = alphabet) => {
    const currentIndex = letters.findIndex(letter => letter === current)
    const nextIndex    = (currentIndex === letters.length - 1) ? 0 : currentIndex + 1
    return letters[nextIndex]
}

const wordFilter = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {

        case 'FILTER_WORDS_BY_LETTER_POSITION':
            newState.letterValues[action.position] = action.letter;  // override using ... in return statement
            newState.wordContains = ' '
            // newState.letterOptions = filterLetterOpts(newState.letterValues)
            // return {...state, newState}
            return Object.assign({}, newState)

        case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
            newState.letterValues = [' ', ' ', ' ']
            newState.wordContains = action.letter
            return Object.assign({}, newState)

        case 'INCREMENT_LETTER_FILTER':
            newState.letterOptions = filterLetterOpts(newState.letterValues)
            newState.letterValues[action.position] = nextLetter(newState.letterValues[action.position], newState.letterOptions[action.position])
            newState.wordContains = ' '
            return Object.assign({}, newState)

        case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
            newState.wordContains = nextLetter(newState.wordContains)
            newState.letterValues = [' ', ' ', ' ']
            return Object.assign({}, newState)

        default:
            return state

    }
}

export default wordFilter
