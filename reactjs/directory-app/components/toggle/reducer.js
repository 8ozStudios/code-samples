const INITIAL_STATE = {
  status: false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE':
    return {
      ...state,
      status: !state.status
    }

  case 'SET':
    return {
      ...state,
      status: action.value
    }

  default:
    return state
  }

}
