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
                    <FilterLetterByPosition position={0} text="First Letter" />
                    <FilterLetterByPosition position={1} text="Second Letter" />
                    <FilterLetterByPosition position={2} text="Third Letter" />
                    <FilterLetterByAnyPosition position={null} text="Contains" letters={this.props.letters} />
                </div>
            }
        </div>
    )
  }
}
