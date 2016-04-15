import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import scrabbleApp from './reducers'
import './css/bootstrap.css'
import './css/style.css'

const store = createStore(scrabbleApp)

// Log the initial state
console.log(store.getState())

function render() {
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
