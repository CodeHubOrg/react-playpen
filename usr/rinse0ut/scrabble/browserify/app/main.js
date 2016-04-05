var React = require('react');
var ReactDOM = require('react-dom');
var letterPoints = require('./storage/letter-points.json');
var wordsTwoLetter = require('./storage/words-two-letter.json');
var wordsThreeLetter = require('./storage/words-three-letter.json');

const DATA =  {
    title: 'Scrabble Word Test',
    letterPoints: letterPoints,
    wordsTwoLetter: wordsTwoLetter,
    wordsThreeLetter: wordsThreeLetter,
    words: wordsTwoLetter
};

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{ this.props.data.title}</h1>
                <TestCtrl data={this.props.data} />
            </div>
        )
   }
});

var TestCtrl = React.createClass({
    getInitialState: function() {
        return {
            initialWords: this.props.data.wordsTwoLetter,
            words: this.props.data.words,
            correct: [],
            wrong: [],
            filter: {
                showDefitions: true,
                showAnswers: false,
                toggleOrder: false,
                position: 'start',
                letter: null,
           }
       }
    },
    handleWordLengthFilter: function(event) {
        var initialWords = this.props.data[event.target.value];
        var position     = this.state.filter.position;
        var letter       = this.state.filter.letter;
        this.setState({
            initialWords: initialWords,
            words: this.filterWords(initialWords, position, letter),
            filter: {
                showDefitions: this.state.filter.showDefitions,
                showAnswers: this.state.filter.showAnswers,
                position: position,
                letter: letter
           }
        });
    },
    handlePositionFilter: function(event) {
        var initialWords = this.state.initialWords;
        var position     = event.target.value;
        var letter       = this.state.filter.letter;
        this.setState({
            initialWords: initialWords,
            words: this.filterWords(initialWords, position, letter),
            filter: {
                showDefitions: this.state.filter.showDefitions,
                showAnswers: this.state.filter.showAnswers,
                position: position,
                letter: letter
           }
        });
    },
    handleLetterFilter: function(event) {
        var initialWords = this.state.initialWords;
        var position     = this.state.filter.position;
        var letter       = event.target.value;
        this.setState({
            initialWords: initialWords,
            words: this.filterWords(initialWords, position, letter),
            filter: {
                showDefitions: this.state.filter.showDefitions,
                showAnswers: this.state.filter.showAnswers,
                position: position,
                letter: letter,
           }
        });
    },
    handleLetterKeyPress: function(event) {
        var initialWords = this.state.initialWords;
        var position    = this.state.filter.position;
        var letter      = String.fromCharCode(event.charCode).toUpperCase();
        this.setState({
            initialWords: initialWords,
            words: this.filterWords(initialWords, position, letter),
            filter: {
                showDefitions: this.state.filter.showDefitions,
                position: position,
                letter: letter,
           }
        });
        this.refs.letter.value = letter;
    },
    handleDefChange: function(event) {
        this.setState({
            filter: {
                showDefitions: !this.state.filter.showDefitions,
                showAnswers: this.state.filter.showAnswers,
                position: this.state.filter.position,
                letter: this.state.filter.letter
           }
        });
    },
    handleAnswersChange: function(event) {
        this.setState({
            filter: {
                showDefitions: this.state.filter.showDefitions,
                showAnswers: !this.state.filter.showAnswers,
                position: this.state.filter.position,
                letter: this.state.filter.letter
           }
        });
    },
    handleOrderChange: function(event) {
        this.setState({
            words: this.state.words.reverse(),
            filter: {
                showDefitions: this.state.filter.showDefitions,
                position: this.state.filter.position,
                letter: this.state.filter.letter,
                toggleOrder: true
           }
        });
    },
    handleGuessKeyPress: function(event) {
        if (event.charCode !== 13) {
            return;
        }
        var guess        = this.refs.guess.value.toUpperCase();
        var initialWords = this.state.initialWords;
        var position     = this.state.filter.position;
        var letter       = this.state.filter.letter;

        var correct = this.state.words.filter(item => {
            return guess === item.word;
        });

        var previousCorrectAnswer = this.state.correct.filter(item => {
            return guess === item.word;
        });

        if (correct.length && previousCorrectAnswer.length === 0) {
            this.state.correct.push(correct[0]);
        } else if (correct.length === 0) {
            this.state.wrong.push(guess);
        }

        this.setState({
            initialWords: initialWords,
            words: this.filterWords(initialWords, position, letter),
            correct: this.state.correct,
            wrong: this.state.wrong,
            filter: {
                showDefitions: this.state.filter.showDefitions,
                position: position,
                letter: letter
           }
        });

        this.refs.guess.value = '';
        this.render();
    },
    filterWords: function(initialWords, position, letter) {
        var words = initialWords
            .filter(item => {
                if (letter === null) {
                    return true
                }
                switch (position) {
                    case 'start':
                        return item.word[0] === letter;
                        break;
                    case 'contains':
                        return item.word.indexOf(letter) !== -1;
                        break;
                    case 'end':
                        return item.word[item.word.length-1] === letter;
                        break;
                    default:
                        return true
                        break;
               }
        });
        return words;
    },
    getLetters: function() {
        var letters = this.props.data.letterPoints.map(item => {
            return item.letter;
        });
        return letters;
    },
    getLetterScoreMap: function() {
        var map = [];
        this.props.data.letterPoints.forEach(function(item) {
            map[item.letter] = item.score;
        });
        return map;
    },
    render: function() {
        return (
            <div>
                <div className="well col-md-6">

                    <label id="position" className="hidden">Word Length</label>
                    <select name="word-length" onChange={this.handleWordLengthFilter}>
                        <option key="wordsTwoLetter" value="wordsTwoLetter">Two Letter</option>
                        <option key="wordsThreeLetter" value="wordsThreeLetter">Three Letter</option>
                    </select>&nbsp;&nbsp;

                    <label id="position">Words</label>
                    <select name="filter" onChange={this.handlePositionFilter}>
                        <option key="start" value="start">starting with</option>
                        <option key="contains" value="contains">containing</option>
                        <option key="end" value="end">ending with</option>
                    </select>&nbsp;&nbsp;

                    <label id="letter">Letter</label>
                    <select name="letter" ref="letter" onChange={this.handleLetterFilter} onKeyPress={this.handleLetterKeyPress}>
                        <option key="">*</option>
                        {
                            this.getLetters().map(letter =>
                                <option key={letter}>{letter}</option>
                            )}
                        }
                    </select><br/>

                    <label id="showDef">Display Definitions</label>
                    <input type="checkbox" name="showDef" checked={this.state.filter.showDefitions} onChange={this.handleDefChange} /><br/>

                    <label id="showAnswers">Show Answers!</label>
                    <input type="checkbox" name="showAnswers" checked={this.state.filter.showAnswers} onChange={this.handleAnswersChange} /><br/>

                    <label id="guess">Guess</label>
                    <input type="text" name="guess" ref="guess" maxLength={this.state.words[0].word.length} onKeyPress={this.handleGuessKeyPress} />
                </div>
                {
                    !this.state.filter.showAnswers ?
                        <StatsPanel
                            wordCount={this.state.words.length}
                            correctWordCount={this.state.correct.length}
                            wrongWordCount={this.state.wrong.length}
                        /> :
                        null
                }
                <div>
                    {
                        this.state.filter.showAnswers ?
                            <AnswersPanel words={this.state.words} letterPoints={this.getLetterScoreMap()} filter={this.state.filter} /> :
                            null
                    }
                    {
                        this.state.correct.length ?
                            <CorrectPanel words={this.state.correct} letterPoints={this.getLetterScoreMap()} filter={this.state.filter} /> :
                            null
                    }
                    {
                        this.state.wrong.length ?
                            <WrongPanel words={this.state.wrong} /> :
                            null
                    }
                </div>
            </div>
        )
   }
});

var StatsPanel = React.createClass({
    calculateAccuracy: function() {
        var correct = this.props.correctWordCount;
        var wrong   = this.props.wrongWordCount;
        var guesses = correct + wrong;

        var accuracy = guesses === 0 ? 0
            :(correct / guesses) * 100;

        return accuracy.toFixed(2);
    },
    render: function() {
        return (
            <div className="col-md-6">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">Stats</h3>
                    </div>
                    <div className="panel-body">
                        <p>Remaining Words: {this.props.wordCount - this.props.correctWordCount}</p>
                        <p>Accuracy: { this.calculateAccuracy() }%</p>
                    </div>
                </div>
            </div>
        )
    }
});

var CorrectPanel = React.createClass({
    render: function() {
        return (
            <div className="col-md-6">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">Correct</h3>
                    </div>
                    <div className="panel-body">
                        <Words words={this.props.words} letterPoints={this.props.letterPoints} filter={this.props.filter} />
                    </div>
                </div>
            </div>
        )
    }
});

var WrongPanel = React.createClass({
    render: function() {
        return (
            <div className="col-md-6">
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">Wrong</h3>
                    </div>
                    <div className="panel-body">
                        {
                            this.props.words.map(word =>
                                <p>{word}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
});

var AnswersPanel = React.createClass({
    render: function() {
        return (
            <div className="col-md-6">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">Answers</h3>
                    </div>
                    <div className="panel-body">
                        <Words words={this.props.words} letterPoints={this.props.letterPoints} filter={this.props.filter} />
                    </div>
                </div>
            </div>
        )
    }
});

var Words = React.createClass({
    render: function() {
        return (
            <div>
                {
                    this.props.words
                    .map(item =>
                        <div className="clearfix">
                            <Word word={item.word} letterPoints={this.props.letterPoints} />
                            { this.props.filter.showDefitions ?
                                <Definition def={item.def} /> : null}
                        </div>
                    )
                }
            </div>
        )
   }
});

var Word = React.createClass({
    render: function() {
        return (
            <div>
                {
                    this.props.word.split('').map(letter =>
                        <Letter letter={letter} score={this.props.letterPoints[letter]} />
                    )
                }
            </div>
        )
   }
});

var Definition = React.createClass({
    render: function() {
        return (
            <p className="def"> - { this.props.def}</p>
        )
   }
});

var Letter = React.createClass({
    render: function() {
        return (
            <p className="btn btn-default pull-left">{ this.props.letter}<sub>{ this.props.score}</sub></p>
        )
    }
});

ReactDOM.render(
    <App data={DATA} />,
    document.getElementById('main')
);
