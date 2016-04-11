import * as types from '../constants/ActionTypes'

export const filterWords = (letter, position) => {
  return {
    type: types.FILTER_WORDS,
    letter,
    position
  }
}

export const incrementLetterFilter = () => {
  return {
    type: types.INCREMENT_LETTER_FILTER
  }
}

export const toggleIncrementLetterFilter = () => {
  return {
    type: types.TOGGLE_INCREMENT_LETTER_FILTER
  }
}
