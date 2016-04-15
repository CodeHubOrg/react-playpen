import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterLetterOpts } from '../reducers/wordFilter'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterPosition, incrementLetter } from '../actions'

export default class FilterLetterByPosition extends Component {
  render() {
    const { position, text, letters, letterOptions, showLetterIncrementors } = this.props
    const dispatch = this.props.dispatch

    // onChange={(e) => dispatch(updateWordFilterLetterValue(position, e.target.value))}

    return (
        <FilterLetter
            onChange={(e) => dispatch(filterWordsByLetterPosition(e.target.value, position))}
            onIncrement={() => dispatch(incrementLetter(position, letterOptions))}
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
)(FilterLetterByPosition)
