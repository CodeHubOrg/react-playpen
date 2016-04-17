import React, { PropTypes } from 'react'
import Letter from './Letter'
import Select from './Select'

const WordFilter = ({ onChange, onIncrement, value, options, text, show }) => (
    <div>
        {
            show ?
                <Letter
                  letter={value}
                  score="*"
                  onIncrement={onIncrement}
                /> :
                <Select
                    onChange={onChange}
                    value={value}
                    options={options}
                    text={text}
                />
        }
    </div>
)

WordFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

export default WordFilter
