import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterPosition, incrementLetterFilter } from '../actions'

export default class FilterLetterByPosition extends Component {
  render() {
    const { position, text, letterFilter, letterOptions, showLetterIncrementors } = this.props
    const dispatch = this.props.dispatch
    return (
        <FilterLetter
            onChange={(e) => dispatch(filterWordsByLetterPosition(e.target.value, position))}
            onIncrement={() => dispatch(incrementLetterFilter(position))}
            value={letterFilter[position]}
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
    letterFilter: state.wordFilter.letterFilter,
    letterOptions: state.wordFilter.letterOptions
  }
}

export default connect(
    mapStateToProps
)(FilterLetterByPosition)
