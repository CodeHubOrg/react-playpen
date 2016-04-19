const initialState = {
    letters: [' ', ' ', ' '],
    contains: ' '
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
                contains: nextLetter(state.contains, action.letterOptions)
            })
        default:
            return state
    }
}

export default wordFilter

// Checks if a word contains a letter at a position, returns true if the letter is a blank
const wordHasLetter = (word, letter, position) => letter === ' ' ? true : word.charAt(position) === letter

// Checks if a word contains a letter in any position
const wordContains = (word, letter) => word.indexOf(letter) !== -1

// Returns an array of letter options
export const getLetterOpts = (letters) => letters.map(item => item.letter)

// Filters words by the word filter letter array state
export const filterWordsByLetters = (words, letters) => {
    return words.filter(item => letters.every((letter, position) => wordHasLetter(item.word, letter, position)))
}

// Filters words by the word filter contains state
export const filterWordsByContains = (words, contains) => {
    return words.filter(item => wordContains(item.word, contains))
}

// Filter letter options based on possible words made with the other selected letter values
export const filterLetterOpts = (letters, opts, words) => {
    let filteredOpts = []
    letters.forEach((letter, position) => {
        const lettersWithCurrentLetterAsBlank = letters.map((letter, key) => (key === position) ? ' ' : letter)
        const validWords = filterWordsByLetters(words, lettersWithCurrentLetterAsBlank)
        const validLetters = opts.filter(letter => validWords.some(item => wordHasLetter(item.word, letter, position)))
        filteredOpts.push(validLetters)
    })
    return filteredOpts
}

// Finds the next letter in an array of letters
const nextLetter = (current, letters) => {
    const currentIndex = letters.findIndex(letter => letter === current)
    const nextIndex    = (currentIndex === letters.length - 1) ? 0 : currentIndex + 1
    return letters[nextIndex]
}
