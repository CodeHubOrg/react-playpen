import React, { Component } from 'react'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterInAnyPosition, incrementLetterFilterInAnyPosition } from '../actions'

export default class FilterLetterByAnyPosition extends Component {
    render() {
        const { store, letters, position, text } = this.props
        const { settingsFilter, wordFilter } = store.getState()
        return (
            <FilterLetter
                onChange={(e) => store.dispatch(filterWordsByLetterInAnyPosition(e.target.value))}
                onIncrement={() => store.dispatch(incrementLetterFilterInAnyPosition())}
                value={wordFilter.wordContains}
                options={letters.map(item => item.letter)}
                text={text}
                show={settingsFilter.showLetterIncrementors}
            />
        )
  }
}
