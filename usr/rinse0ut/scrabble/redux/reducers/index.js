import letters from '../stores/letters.json';
import twoLetterWords from '../stores/words-two-letter.json';
import threeLetterWords from '../stores/words-three-letter.json';

const initialState = {
    words: [],
    letterIndex: 0,
    show: false
}

export default function letterApp(state = initialState, action) {
  switch (action.type) {
    case 'FILTER_WORD':
        return Object.assign({}, state, {
            words: threeLetterWords.filter(item => item.word[0] === action.letter)
        })
    case 'INCREMENT':
        let letterIndex = (state.letterIndex >= letters.length-1) ? 0 : letterIndex+1;
        // return Object.assign({}, state, {
        //   letterIndex: letterIndex
        // })
    case 'TOGGLE_SHOW':
        return Object.assign({}, state, {
          show: !state.show
        })
    default:
      return state
  }
}
