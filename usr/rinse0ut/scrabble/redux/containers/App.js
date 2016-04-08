import React, { Component } from 'react'
import Checkbox from '../components/Checkbox'
import Letter from '../components/Letter'

export default class App extends Component {
  render() {
    const store = this.props.store
    const { show, letters, letterIndex } = store.getState()
    const letter = letters[letterIndex]
    return (
        <div>
            <h1>Letter Incrementor</h1>
            <Checkbox
                onChange={() => store.dispatch({ type: 'TOGGLE_SHOW' })}
                checked={show}
                text="Show Letter"
            />
            {
                show ?
                    <Letter
                      letter={letter.letter}
                      score={letter.score}
                      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
                    /> :
                    null
            }
        </div>
    )
  }
}
