import { connect } from 'react-redux'
import { filterWordsByLetters, filterWordsByContains } from '../reducers/wordFilter'
import WordList from '../components/WordList'

const mapStateToProps = (state, props) => {
  return {
    words: state.wordFilter.contains !== ' ' ?
        filterWordsByContains(props.words, state.wordFilter.contains) :
        filterWordsByLetters(props.words, state.wordFilter.letters)
  }
}

const VisableWordList = connect(
    mapStateToProps
)(WordList)

export default VisableWordList
