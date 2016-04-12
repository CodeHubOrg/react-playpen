import React, { Component } from 'react'
import FilterLetterByPosition from './FilterLetterByPosition'
import FilterLetterByAnyPosition from './FilterLetterByAnyPosition'

export default class Filter extends Component {
  render() {
    return (
        <div className="well col-md-3">
            <h2>Filter</h2>
            {
                <div>
                    <FilterLetterByPosition position={0} text="First Letter" {...this.props} />
                    <FilterLetterByPosition position={1} text="Second Letter" {...this.props} />
                    <FilterLetterByPosition position={2} text="Third Letter" {...this.props} />
                    <FilterLetterByAnyPosition position={null} text="Contains" {...this.props} />
                </div>
            }
        </div>
    )
  }
}
