import _ from 'lodash'

const INITIAL_STATE = {
  selected: [],
  status: 'closed',
  init:false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE':
    return {
      ...state,
      status: (state.status == 'open') ? 'closed' : 'open'
    }

  case 'SELECT':
    return {
      ...state,
      init:true,
      selected: _.includes(state.selected, action.id) ?
        _.without(state.selected, action.id) :
        [ ...state.selected, action.id ]
    }

  case 'SET':
    return {
      ...state,
      init:true,
      selected: (action.selected) ? action.selected : []
    }

  case 'INIT':
    return {
      ...state,
      init:true,
      selected: []
    }

  default:
    return state
  }

}
