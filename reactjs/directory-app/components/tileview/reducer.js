const INITIAL_STATE = {
  filters:null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  // case 'FILTER':
  //   return {
  //     ...state,
  //     filter: action.filter
  //   }

  default:
    return state
  }

}
