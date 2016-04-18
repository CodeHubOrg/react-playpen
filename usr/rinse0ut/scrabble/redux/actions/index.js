import * as types from '../constants/ActionTypes'

export const updateWordFilterLetter = (letter, position) => {
  return {
    type: types.UPDATE_WORD_FILTER_LETTER,
    letter,
    position
  }
}

export const updateWordFilterContains = (letter) => {
  return {
    type: types.UPDATE_WORD_FILTER_CONTAINS,
    letter
  }
}

export const incrementWordFilterletter = (position, letterOptions) => {
  return {
    type: types.INCREMENT_WORD_FILTER_LETTER,
    position: position,
    letterOptions: letterOptions
  }
}

export const incrementWordFilterContains =  (position, letterOptions) => {
  return {
    type: types.INCREMENT_WORD_FILTER_CONTAINS,
    position: position,
    letterOptions: letterOptions
  }
}

export const toggleIncrementletterValues = () => {
  return {
    type: types.TOGGLE_INCREMENT_LETTER_FILTER
  }
}
