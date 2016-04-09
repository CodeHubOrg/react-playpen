import React, { Component } from 'react'
import Select from '../components/Select'
import Checkbox from '../components/Checkbox'
import Letter from '../components/Letter'
import letters from '../stores/letters.json'

export default class App extends Component {
  render() {
    const store = this.props.store
    const { show, letterIndex, words } = store.getState()
    const letter = letters[letterIndex]
    console.log(store)
    console.log(letters, letter, letterIndex)
    return (
        <div>
            <h1>Two Letter Word Filter</h1>
            <Select
                onChange={(e) => store.dispatch({ type: 'FILTER_WORD', letter: e.target.value })}
                options={letters.map(item => item.letter)}
                text="Letter"
            />
            <Checkbox
                onChange={() => store.dispatch({ type: 'TOGGLE_SHOW' })}
                checked={show}
                text="Show Letter Incrementor"
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
            {
                words.map(item => <span>{item.word} </span>)
            }
        </div>
    )
  }
}
