import { combineReducers } from 'redux'
import wordFilter from './wordFilter'
import settingsFilter from './settingsFilter'

const scrabbleApp = combineReducers({
  wordFilter,
  settingsFilter
})

export default scrabbleApp
