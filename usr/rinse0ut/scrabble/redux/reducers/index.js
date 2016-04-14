import { combineReducers } from 'redux'
import wordFilter from './wordFilter'
// import settings from './settings'
import settingsFilter from './settingsFilter'

const scrabbleApp = combineReducers({
  wordFilter,
  settingsFilter
})

export default scrabbleApp
