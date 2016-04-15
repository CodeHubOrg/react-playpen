import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterLetterOpts } from '../reducers/wordFilter'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterPosition, incrementletterValues } from '../actions'

export default class FilterLetterByPosition extends Component {
  render() {
    const { position, text, letterValues, letterOptions, showLetterIncrementors } = this.props
    const dispatch = this.props.dispatch

    // onChange={(e) => dispatch(updateWordFilterLetterValue(position, e.target.value))}

    return (
        <FilterLetter
            onChange={(e) => dispatch(filterWordsByLetterPosition(e.target.value, position))}
            onIncrement={() => dispatch(incrementletterValues(position, letterOptions))}
            value={letterValues[position]}
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
    letterValues: state.wordFilter.letterValues,
    letterOptions: filterLetterOpts(state.wordFilter.letterValues)
  }
}

export default connect(
    mapStateToProps
)(FilterLetterByPosition)
