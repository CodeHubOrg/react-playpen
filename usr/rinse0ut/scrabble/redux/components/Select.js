import React, { PropTypes } from 'react'

const Select = ({ onChange, options, text }) => (
    <div>
        <label id={text}>
            {text}
        </label>
        <select
            name="letter"
            className="form-control"
            onChange={onChange}
        >
            <option key="" value="">*</option>
            {
                options.map(value =>
                    <option key={value} value={value}>{value}</option>
                )}
            }
        </select>
    </div>
)

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

export default Select
