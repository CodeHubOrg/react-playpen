import * as types from '../constants/ActionTypes'

export const filterWordsByLetterPosition = (letter, position) => {
  return {
    type: types.FILTER_WORDS_BY_LETTER_POSITION,
    letter,
    position
  }
}

export const filterWordsByLetterInAnyPosition = (letter) => {
  return {
    type: types.FILTER_WORDS_BY_LETTER_IN_ANY_POSITION,
    letter
  }
}

export const incrementletterValues = (position = null) => {
  return {
    type: types.INCREMENT_LETTER_FILTER,
    position: position
  }
}

export const incrementletterValuesInAnyPosition = (position = null) => {
  return {
    type: types.INCREMENT_LETTER_IN_ANY_POSITION_FILTER,
    position: position
  }
}

export const toggleIncrementletterValues = () => {
  return {
    type: types.TOGGLE_INCREMENT_LETTER_FILTER
  }
}
