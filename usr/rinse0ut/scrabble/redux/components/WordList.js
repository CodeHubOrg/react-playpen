import React, { PropTypes } from 'react'

const WordList = ({ words }) => (
    <div className="pull-left">
        {
            words.map(item => <span className="word" key={item.word}><strong>{item.word} </strong></span>)
        }
    </div>
)

WordList.propTypes = {
  words: PropTypes.array.isRequired,
}

export default WordList
