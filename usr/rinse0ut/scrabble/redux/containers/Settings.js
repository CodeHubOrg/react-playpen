import React, { Component } from 'react'
import Checkbox from '../components/Checkbox'
import { toggleIncrementLetterFilter } from '../actions'

export default class Settings extends Component {
  render() {
    const { store } = this.props
    const { show } = store.getState()
    return (
        <div className="well col-md-3 gutter-left">
            <h2>Settings</h2>
            <Checkbox
                onChange={() => store.dispatch(toggleIncrementLetterFilter())}
                checked={show}
                text="Letter Incrementor"
            />
        </div>
    )
  }
}
