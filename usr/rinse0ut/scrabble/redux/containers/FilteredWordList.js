import { connect } from 'react-redux'
import WordList from '../components/WordList'

const getFilteredWords = (words, letterFilter) => {
    return words.filter(item => letterFilter.every((letter, position) => (letter === ' ') ? true : item.word[position] === letter))
}

const mapStateToProps = (state, props) => {
  return {
    words: getFilteredWords(props.words, state.wordFilter.letterFilter)
  }
}

const FilteredWordList = connect(
    mapStateToProps
)(WordList)

export default FilteredWordList
