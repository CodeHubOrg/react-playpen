import React, { PropTypes } from 'react'

const Checkbox = ({ onChange, checked, text }) => (
    // let name = text.replace(/\s+/g, '-').toLowerCase();
    <div>
        <label id={text}>
            {text}
        </label>
        <input
            type="checkbox"
            name={text}
            onChange={onChange}
            checked={checked}
        />
    </div>
)

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Checkbox
