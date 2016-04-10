import * as types from '../constants/ActionTypes'

function filterWord(letter) {
  return {
    type: FILTER_WORD,
    letter
  }
}

function incrementLetterFilter() {
  return {
    type: INCREMENT_LETTER_FILTER
  }
}

function toggleIncrementLetterFilter(text) {
  return {
    type: TOGGLE_INCREMENT_LETTER_FILTER
  }
}
