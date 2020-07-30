const INITIAL_STATE = {
  //categories:null,
  //programs:null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  // case 'FETCH_CATEGORIES_SUCCESS':
  //   return {
  //     ...state,
  //     categories: action.result.data
  //   }
  //
  // case 'FETCH_PROGRAMS_SUCCESS':
  //   return {
  //     ...state,
  //     programs: action.result.data
  //   }

  default:
    return state
  }

}
