import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterInAnyPosition, incrementLetterFilterInAnyPosition } from '../actions'

export default class FilterLetterByAnyPosition extends Component {
    render() {
        const { position, text, letters, wordContains, letterOptions, showLetterIncrementors } = this.props
        const dispatch = this.props.dispatch
        return (
            <FilterLetter
                onChange={(e) => dispatch(filterWordsByLetterInAnyPosition(e.target.value))}
                onIncrement={() => dispatch(incrementLetterFilterInAnyPosition())}
                value={wordContains}
                options={letters.map(item => item.letter)}
                text={text}
                show={showLetterIncrementors}
            />
        )
  }
}

const mapStateToProps = (state) => {
  return {
    showLetterIncrementors: state.settingsFilter.showLetterIncrementors,
    wordContains: state.wordFilter.wordContains,
    letterOptions: state.wordFilter.letterOptions
  }
}

export default connect(
    mapStateToProps
)(FilterLetterByAnyPosition)
