const INITIAL_STATE = {
  showShare:false,
  showView:false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE_SHARE':
    return {
      ...state,
      showShare: !state.showShare
    }

  case 'TOGGLE_VIEW':
    return {
      ...state,
      showView: !state.showView
    }

  default:
    return state
  }

}
