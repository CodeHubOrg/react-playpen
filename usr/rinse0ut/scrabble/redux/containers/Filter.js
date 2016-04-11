import React, { Component } from 'react'
import FilterLetter from './FilterLetter'

export default class Filter extends Component {
  render() {
    return (
        <div className="well col-md-3">
            <h2>Filter</h2>
            {
                <div>
                    <FilterLetter position={0} text="First Letter" {...this.props} />
                    <FilterLetter position={1} text="Second Letter" {...this.props} />
                    <FilterLetter position={2} text="Third Letter" {...this.props} />
                    <FilterLetter position={null} text="Contains" {...this.props} />
                </div>
            }
        </div>
    )
  }
}
