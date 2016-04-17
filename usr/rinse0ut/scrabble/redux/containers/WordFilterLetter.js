import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterLetterOpts } from '../reducers/wordFilter'
import WordFilter from '../components/WordFilter'
import { updateWordFilterLetter, incrementWordFilterletter } from '../actions'

export default class WordFilterLetter extends Component {
  render() {
    const { position, text, letters, letterOptions, showLetterIncrementors } = this.props
    const dispatch = this.props.dispatch
    return (
        <WordFilter
            onChange={(e) => dispatch(updateWordFilterLetter(e.target.value, position))}
            onIncrement={() => dispatch(incrementWordFilterletter(position, letterOptions))}
            value={letters[position]}
            options={letterOptions[position]}
            text={text}
            show={showLetterIncrementors}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showLetterIncrementors: state.settingsFilter.showLetterIncrementors,
    letters: state.wordFilter.letters,
    letterOptions: filterLetterOpts(state.wordFilter.letters)
  }
}

export default connect(
    mapStateToProps
)(WordFilterLetter)
