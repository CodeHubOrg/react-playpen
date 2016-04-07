import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Letter from './components/Letter'
import counter from './reducers'
require('./css/bootstrap.css')
require('./css/style.css')

const store = createStore(counter)
const rootEl = document.getElementById('root')
const DATA = [
  {
    "letter" : "A",
    "score": 1
  },
  {
    "letter" : "B",
    "score": 3
  },
  {
    "letter" : "C",
    "score": 3
  },
  {
    "letter" : "D",
    "score": 2
  },
  {
    "letter" : "E",
    "score": 1
  }
]

function render() {
  let letter = DATA[store.getState()];
  ReactDOM.render(
    <Letter
      letter={letter.letter}
      score={letter.score}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    />,
    rootEl
  )
}

render()
store.subscribe(render)
