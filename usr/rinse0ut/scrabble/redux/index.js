import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './containers/App'
import scrabbleApp from './reducers'
import './css/bootstrap.css'
import './css/style.css'

const store = createStore(scrabbleApp)
const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <App store={store} />,
    rootEl
  )
}

render()
store.subscribe(render)

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
