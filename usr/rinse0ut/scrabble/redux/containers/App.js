import React, { Component } from 'react'
import Filter from './Filter'
import Settings from './Settings'
import letters from '../stores/letters.json'

export default class App extends Component {
  render() {
    const store = this.props.store
    const { show, words } = store.getState()
    return (
        <div>
            <h1>Two Letter Words</h1>
            <Filter store={store} letters={letters} />
            <Settings store={store} />
            <div className="pull-left">
            {
                words.map(item => <span key={item.word}>{item.word} </span>)
            }
            </div>
        </div>
    )
  }
}
