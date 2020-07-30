const INITIAL_STATE = {
  items:[],
  status:'loading'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_FAVORITES_SUCCESS':
    return {
      ...state,
      items: action.value || [],
      status: 'loaded'
    }

  case 'SAVE_FAVORITE_SUCCESS':
    return {
      ...state,
      items: action.value,
      status: 'saved'
    }

  case 'CLEAR_FAVORITE_SUCCESS':
    return {
      ...state,
      items: action.value,
      status: 'cleared'
    }

  case 'ADD':
    return {
      ...state,
      items: [ ...state.items, parseFloat(action.id)],
      status: 'updated'
    }

  case 'REMOVE':
    return {
      ...state,
      items: [ ..._.filter(state.items, (n) => n != action.id) ],
      status: 'updated'
    }

  case 'REMOVE_ALL':
    return {
      ...state,
      items: [],
      status: 'updated'
    }

  default:
    return state
  }

}
