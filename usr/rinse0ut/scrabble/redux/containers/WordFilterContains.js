import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLetterOpts } from '../reducers/wordFilter'
import WordFilter from '../components/WordFilter'
import { updateWordFilterContains, incrementWordFilterContains } from '../actions'

export default class WordFilterContains extends Component {
    render() {
        const { text, letters, contains, showLetterIncrementors } = this.props
        const dispatch = this.props.dispatch
        return (
            <WordFilter
                onChange={(e) => dispatch(updateWordFilterContains(e.target.value))}
                onIncrement={() => dispatch(incrementWordFilterContains(contains, letters))}
                value={contains}
                options={letters}
                text={text}
                show={showLetterIncrementors}
            />
        )
  }
}

const mapStateToProps = (state, props) => {
  return {
    showLetterIncrementors: state.settingsFilter.showLetterIncrementors,
    contains: state.wordFilter.contains,
    letters: getLetterOpts(props.letters)
  }
}

export default connect(
    mapStateToProps
)(WordFilterContains)
