import React, { Component } from 'react'
import Select from '../components/Select'
import Letter from '../components/Letter'
import { filterWords, incrementLetterFilter } from '../actions'
import * as types from '../constants/LetterPositions'

export default class FilterLetter extends Component {
  render() {
    const { store, letters, position, text } = this.props
    const { show, letterFilter, words } = store.getState()
    return (
        <div>
            {
                show ?
                    <Letter
                      letter={letterFilter[position]}
                      score="*"
                      onIncrement={() => store.dispatch(incrementLetterFilter())}
                    /> :
                    <Select
                        onChange={(e) => store.dispatch(filterWords(e.target.value, position))}
                        value={letterFilter[position]}
                        options={letters.map(item => item.letter)}
                        text={text}
                    />
            }
        </div>
    )
  }
}
