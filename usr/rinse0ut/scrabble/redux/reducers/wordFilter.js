import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const alphabet     = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const initalWords  = threeLetterWords;
const initialState = {
    words: initalWords,
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

const dump = (name, arr) => {
    arr.forEach((el, i) => console.log(name + ' pos ' + i, el))
}

export default function wordFilter(state = initialState, action) {
  let words           = state.words
  let letterFilter    = state.letterFilter
  let letterOptions   = state.letterOptions
  let wordContains    = state.wordContains

  switch (action.type) {

    case 'FILTER_WORDS_BY_LETTER_POSITION':
        letterFilter[action.position] = action.letter;
        words                         = filterWordsByLetterPosition(initalWords, letterFilter)
        letterOptions                 = filterLetterOpts(alphabet, letterFilter, initalWords)
        return Object.assign({}, state, {
            words: words,
            letterFilter: letterFilter,
            letterOptions: letterOptions,
            wordContains: ' '
        })

    case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
        words = filterWordsByLetterInAnyPosition(initalWords, action.letter)
        wordContains = action.letter
        return Object.assign({}, state, {
            words: words,
            letterFilter: [' ', ' ', ' '],
            wordContains: wordContains
        })

    case 'INCREMENT_LETTER_FILTER':
        letterOptions                 = filterLetterOpts(alphabet, letterFilter, initalWords)
        letterFilter[action.position] = nextLetter(letterFilter[action.position], letterOptions[action.position])
        words                         = filterWordsByLetterPosition(initalWords, letterFilter)
        return Object.assign({}, state, {
            words: words,
            letterFilter: letterFilter,
            letterOptions: letterOptions,
            wordContains: ' '
        })

    case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
        wordContains = nextLetter(state.wordContains)
        words        = filterWordsByLetterInAnyPosition(initalWords, wordContains)
        return Object.assign({}, state, {
            words: words,
            letterFilter: [' ', ' ', ' '],
            wordContains: wordContains
        })

    default:
      return state
  }
}
