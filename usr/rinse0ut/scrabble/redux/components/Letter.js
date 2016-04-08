import React, { Component, PropTypes } from 'react'

class Letter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { letter, score, onIncrement } = this.props
    return (
      <p onClick={onIncrement}
        className="btn btn-default pull-left">
        { this.props.letter}
        <sub>
          { this.props.score}
        </sub>
      </p>
    )
  }
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

export default Letter
