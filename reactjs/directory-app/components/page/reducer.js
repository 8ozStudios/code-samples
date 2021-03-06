const INITIAL_STATE = {
  resources:{},
  ready:false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_RESOURCE_REQUEST':
    return {
      ...state,
      resources: {
        ...state.resources,
        [action.prop]: {
          status: state.resources[action.prop] ? 'refreshing' : 'loading',
          data: state.resources[action.prop] ? state.resources[action.prop].data : null
        }
      }
    }

  case 'FETCH_RESOURCE_SUCCESS':
    return {
      ...state,
      resources: {
        ...state.resources,
        [action.prop]: {
          status: 'loaded',
          data: action.result.data
        }
      }
    }

  case 'FETCH_RESOURCE_FAILURE':
    return {
      ...state,
      resources: {
        ...state.resources,
        [action.prop]: {
          status: (action.result.meta.status === 'FORBIDDEN') ? 'forbidden' : 'failure',
          data: null
        }
      }
    }

  case 'READY':
    return {
      ...state,
      ready: true
    }

  default:
    return state
  }

}
