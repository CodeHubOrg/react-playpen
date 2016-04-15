import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import Settings from './Settings'
import FilteredWordList from './FilteredWordList'
import letters from '../stores/letters.json'
import threeLetterWords from '../stores/words-three-letter.json';

export default class App extends Component {
  render() {
    const { settingsFilter, wordFilter } = this.props.state
    return (
        <div>
            <h1>Scrabble Words</h1>
            <Filter letters={letters} />
            <Settings dispatch={this.props.dispatch} />
            <FilteredWordList words={threeLetterWords} />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(
    mapStateToProps
)(App)
