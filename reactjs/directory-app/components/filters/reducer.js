const INITIAL_STATE = {
  filters:{}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_FILTER':
    return {
      ...state,
      filters: {
        ...state.filters,
        [ action.key ]: action.value
      }
    }

  case 'SET_FILTERS':
    return {
      ...state,
      filters: action.filters
    }

  default:
    return state
  }

}
