const INITIAL_STATE = {
  activeProgram:null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SHOW_PROGRAM_DETAILS':
    return {
      ...state,
      activeProgram: action.id
    }

  case 'CLOSE_WINDOW':
    return {
      ...state,
      activeProgram: null
    }

  default:
    return state
  }

}
