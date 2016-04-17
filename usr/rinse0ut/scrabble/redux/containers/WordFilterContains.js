import React, { Component } from 'react'
import { connect } from 'react-redux'
import WordFilter from '../components/WordFilter'
import { updateWordFilterContains, incrementWordFilterContains } from '../actions'

export default class WordFilterContains extends Component {
    render() {
        const { position, text, letters, contains, letterOptions, showLetterIncrementors } = this.props
        const dispatch = this.props.dispatch
        return (
            <WordFilter
                onChange={(e) => dispatch(updateWordFilterContains(e.target.value))}
                onIncrement={() => dispatch(incrementWordFilterContains())}
                value={contains}
                options={letters.map(item => item.letter)}
                text={text}
                show={showLetterIncrementors}
            />
        )
  }
}

const mapStateToProps = (state) => {
  return {
    showLetterIncrementors: state.settingsFilter.showLetterIncrementors,
    contains: state.wordFilter.contains,
    letterOptions: state.wordFilter.letterOptions
  }
}

export default connect(
    mapStateToProps
)(WordFilterContains)
