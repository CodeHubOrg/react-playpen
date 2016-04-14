const initialState = {
    showLetterIncrementors: false
}

const settingsFilter = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_INCREMENT_LETTER_FILTER':
            return Object.assign({}, state, {
                showLetterIncrementors: !state.showLetterIncrementors
            })
        default:
            return state
    }
}

export default settingsFilter
