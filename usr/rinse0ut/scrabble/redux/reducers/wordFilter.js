import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const alphabet     = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const initalWords  = threeLetterWords;
const initialState = {
    words: threeLetterWords,
    letterFilter: [' ', ' ', ' '],
    letterOptions: [alphabet, alphabet, alphabet],
    wordContains: ' '
}

const filterWordsByLetterPosition = (words, letterFilter) => {
    return words.filter(item => letterFilter.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

const filterWordsByLetterInAnyPosition = (words, letter) => {
    return words.filter(item => item.word.indexOf(letter) !== -1)
}

const filterLetterOpts = (opts, letterFilter, words) => {
    let filteredOpts = []
    letterFilter.forEach((letter, pos) => {
        let newLetterFilter = letterFilter.slice()
        newLetterFilter[pos] = ' '
        const filteredWords = filterWordsByLetterPosition(words, newLetterFilter)
        filteredOpts.push(opts.filter(letter => filteredWords.some(item => (letter === ' ') ? true : item.word[pos] === letter)))
    })
    return filteredOpts
}

const nextLetter = (current, letters = alphabet) => {
    const currentIndex = letters.findIndex(letter => letter === current)
    const nextIndex    = (currentIndex === letters.length - 1) ? 0 : currentIndex + 1
    return letters[nextIndex]
}

const words = (state, action) => {
    switch (action.type) {
        case 'FILTER_WORDS_BY_LETTER_POSITION':
        case 'INCREMENT_LETTER_FILTER':
            return filterWordsByLetterPosition(initalWords, state.letterFilter)

        case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
        case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
            return filterWordsByLetterInAnyPosition(initalWords, state.wordContains)

        default:
            return state.words
    }
}

const wordFilter = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

    case 'FILTER_WORDS_BY_LETTER_POSITION':
        newState.letterFilter[action.position] = action.letter;  // override using ... in return statement
        newState.letterOptions = filterLetterOpts(alphabet, newState.letterFilter, initalWords)

        return Object.assign({}, newState, {
            words: words(newState, action)
        })

    case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
        newState.letterFilter = [' ', ' ', ' ']
        newState.wordContains = action.letter
        return Object.assign({}, newState, {
            words: words(newState, action)
        })

    case 'INCREMENT_LETTER_FILTER':
        newState.letterOptions = filterLetterOpts(alphabet, newState.letterFilter, initalWords)
        newState.letterFilter[action.position] = nextLetter(newState.letterFilter[action.position], newState.letterOptions[action.position])
        newState.wordContains = ' '
        return Object.assign({}, newState, {
            words: words(newState, action)
        })

    case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
        newState.wordContains = nextLetter(newState.wordContains)
        newState.letterFilter = [' ', ' ', ' ']
        return Object.assign({}, newState, {
            words: words(newState, action)
        })

    default:
      return state
  }
}

export default wordFilter
