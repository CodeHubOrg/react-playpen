import React, { Component } from 'react'
import Select from '../components/Select'
import Letter from '../components/Letter'

export default class Filter extends Component {
  render() {
    const { store, letters } = this.props
    const { show, firstLetterFilter, words } = store.getState()
    return (
        <div className="well col-md-3">
            <h2>Filter</h2>
            {
                show ?
                    <Letter
                      letter={firstLetterFilter}
                      score="*"
                      onIncrement={() => store.dispatch({ type: 'INCREMENT_LETTER_FILTER' })}
                    /> :
                    <Select
                        onChange={(e) => store.dispatch({ type: 'FILTER_WORD', letter: e.target.value })}
                        value={firstLetterFilter}
                        options={letters.map(item => item.letter)}
                        text="First Letter"
                    />
            }
        </div>
    )
  }
}
