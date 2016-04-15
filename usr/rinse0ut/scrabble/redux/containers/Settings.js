import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import { toggleIncrementletterValues } from '../actions'

export default class Settings extends Component {
  render() {
    const { showLetterIncrementors } = this.props.settingsFilter
    const dispatch = this.props.dispatch
    return (
        <div className="well col-md-3 gutter-left">
            <h2>Settings</h2>
            <Checkbox
                onChange={() => dispatch(toggleIncrementletterValues())}
                checked={showLetterIncrementors}
                text="Letter Incrementor"
            />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settingsFilter: state.settingsFilter
  }
}

export default connect(
    mapStateToProps
)(Settings)
