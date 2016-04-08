import letterData from '../stores/letters.json';

const initialState = {
    letters: letterData,
    letterIndex: 0,
    show: false
}

export default function letterApp(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
        let letterIndex = (state.letterIndex >= state.letters.length-1) ? 0 : state.letterIndex+1;
        return Object.assign({}, state, {
          letterIndex: letterIndex
        })
    case 'TOGGLE_SHOW':
        return Object.assign({}, state, {
          show: !state.show
        })
    default:
      return state
  }
}
