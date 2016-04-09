import React, { Component } from 'react'
import Checkbox from '../components/Checkbox'

export default class Settings extends Component {
  render() {
    const { store, show } = this.props
    return (
        <div className="well col-md-3 gutter-left">
            <h2>Settings</h2>
            <Checkbox
                onChange={() => store.dispatch({ type: 'TOGGLE_INCREMENT_LETTER_FILTER' })}
                checked={show}
                text="Letter Incrementor"
            />
        </div>
    )
  }
}
