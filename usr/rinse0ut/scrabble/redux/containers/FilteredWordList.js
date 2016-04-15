import { connect } from 'react-redux'
import { filterWordsByLetterPosition, filterWordsByLetterInAnyPosition } from '../reducers/wordFilter'
import WordList from '../components/WordList'

const mapStateToProps = (state, props) => {
  return {
    words: state.wordFilter.wordContains !== ' ' ?
        filterWordsByLetterInAnyPosition(props.words, state.wordFilter.wordContains) :
        filterWordsByLetterPosition(props.words, state.wordFilter.letters)
  }
}

const FilteredWordList = connect(
    mapStateToProps
)(WordList)

export default FilteredWordList
