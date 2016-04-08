import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './containers/App'
import letterApp from './reducers'
import './css/bootstrap.css'
import './css/style.css'

const store = createStore(letterApp)
const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <App store={store} />,
    rootEl
  )
}

render()
store.subscribe(render)
