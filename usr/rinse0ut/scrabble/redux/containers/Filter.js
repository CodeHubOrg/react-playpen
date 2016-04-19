import React, { Component } from 'react'
import WordFilterLetter from './WordFilterLetter'
import WordFilterContains from './WordFilterContains'

export default class Filter extends Component {
  render() {
    return (
        <div className="well col-md-3">
            <h2>Filter</h2>
            {
                <div>
                    <WordFilterLetter
                        position={0}
                        text="First Letter"
                        letters={this.props.letters}
                        words={this.props.words}
                    />
                    <WordFilterLetter
                        position={1}
                        text="Second Letter"
                        letters={this.props.letters}
                        words={this.props.words}
                    />
                    <WordFilterLetter
                        position={2}
                        text="Third Letter"
                        letters={this.props.letters}
                        words={this.props.words}
                    />
                    <WordFilterContains
                        text="Contains"
                        letters={this.props.letters}
                    />
                </div>
            }
        </div>
    )
  }
}
