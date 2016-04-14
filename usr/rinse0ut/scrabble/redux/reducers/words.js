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

export default function words(state = initialState, action) {
  let words           = state.words
  let letterFilter    = state.letterFilter
  console.log('WORDS', state)

  switch (action.type) {

    case 'FILTER_WORDS_BY_LETTER_POSITION':
        words = filterWordsByLetterPosition(initalWords, letterFilter)
        return Object.assign({}, state, {
            words: words,
        })

    case 'FILTER_WORDS_BY_LETTER_IN_ANY_POSITION':
        words = filterWordsByLetterInAnyPosition(initalWords, action.letter)
        return Object.assign({}, state, {
            words: words,
        })

    case 'INCREMENT_LETTER_FILTER':
        words = filterWordsByLetterPosition(initalWords, letterFilter)
        return Object.assign({}, state, {
            words: words,
        })

    case 'INCREMENT_LETTER_IN_ANY_POSITION_FILTER':
        words = filterWordsByLetterInAnyPosition(initalWords, wordContains)
        return Object.assign({}, state, {
            words: words,
        })

    default:
      return state
  }
}
