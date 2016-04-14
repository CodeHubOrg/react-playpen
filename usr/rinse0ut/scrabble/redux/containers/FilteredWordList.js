import { connect } from 'react-redux'
import WordList from '../components/WordList'

const getFilteredWords = (words, letterFilter) => {
    return words.filter(item => letterFilter.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

const filterWordsByLetterInAnyPosition = (words, letter) => {
    return words.filter(item => item.word.indexOf(letter) !== -1)
}

const mapStateToProps = (state, props) => {
  return {
    words: state.wordFilter.wordContains !== ' ' ?
        filterWordsByLetterInAnyPosition(props.words, state.wordFilter.wordContains) :
        getFilteredWords(props.words, state.wordFilter.letterFilter)
  }
}

const FilteredWordList = connect(
    mapStateToProps
)(WordList)

export default FilteredWordList
