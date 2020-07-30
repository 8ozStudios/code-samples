const INITIAL_STATE = {
  programs:[],
  filters:{},
  showFilter:false,
  status:''
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_PROGRAMS_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      programs: [ ...action.result.data ],
      pagination: {
        all: action.result.pagination.all,
        limit: action.result.pagination.limit,
        skip: action.result.pagination.skip,
        total: action.result.pagination.total,
        page: 1
      }
    }

  case 'FETCH_MORE_PROGRAMS_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      programs: [
        ...state.programs,
        ...action.result.data
      ],
      pagination: {
        all: action.result.pagination.all,
        limit: action.result.pagination.limit,
        skip: action.result.pagination.skip,
        total: action.result.pagination.total,
        page: (action.result.pagination.skip / action.result.pagination.limit) +  1
      }
    }

  case 'FETCH_MORE_PROGRAMS_REQUEST':
    return {
      ...state,
      status: 'refreshing'
    }

  case 'FETCH_PROGRAMS_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FILTER':
    return {
      ...state,
      filters: action.filters
    }

  case 'TOGGLE_FILTER':
    return {
      ...state,
      showFilter: !state.showFilter
    }

  case 'TOGGLE_VIEW':
    return {
      ...state,
      view: action.view
    }

  case 'LOAD_VIEW_SUCCESS':
    return {
      ...state,
      view: action.value || state.view
    }

  default:
    return state
  }

}
