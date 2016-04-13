import React, { Component } from 'react'
import FilterLetter from '../components/FilterLetter'
import { filterWordsByLetterPosition, incrementLetterFilter } from '../actions'

export default class FilterLetterByPosition extends Component {
  render() {
    const { store, position, text } = this.props
    const { show, letterOptions, letterFilter, words } = store.getState()
    return (
        <FilterLetter
            onChange={(e) => store.dispatch(filterWordsByLetterPosition(e.target.value, position))}
            onIncrement={() => store.dispatch(incrementLetterFilter(position))}
            value={letterFilter[position]}
            options={letterOptions[position]}
            text={text}
            show={show}
        />
    )
  }
}
