const INITIAL_STATE = {
  program:null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_PROGRAM_SUCCESS':
    return {
      ...state,
      status:'loaded',
      program: { ...action.result.data }
    }

  case 'FETCH_PROGRAM_REQUEST':
    return {
      ...state,
      status: 'refreshing'
    }

  default:
    return state
  }

}
