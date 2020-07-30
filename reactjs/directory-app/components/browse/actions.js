export const fetchPrograms = (query) => ({
  type: 'API_REQUEST',
  endpoint: process.env.API_HOST + '/api/sites/sites/1/types/2/items?' + query,
  request: 'FETCH_PROGRAMS_REQUEST',
  success: 'FETCH_PROGRAMS_SUCCESS',
  failure: 'FETCH_PROGRAMS_FAILURE'
})

export const fetchMorePrograms = (query) => ({
  type: 'API_REQUEST',
  endpoint: process.env.API_HOST + '/api/sites/sites/1/types/2/items?' + query,
  request: 'FETCH_MORE_PROGRAMS_REQUEST',
  success: 'FETCH_MORE_PROGRAMS_SUCCESS',
  failure: 'FETCH_MORE_PROGRAMS_FAILURE'
})

export const filter = (filters) => ({
  type: 'FILTER',
  filters
})

export const toggleFilter = () => ({
  type: 'TOGGLE_FILTER'
})

export const toggleView = (view) => ({
  type: 'TOGGLE_VIEW',
  view
})

export const load = () => ({
  type: 'LOCAL_GET',
  key: 'view',
  request: 'LOAD_VIEW_REQUEST',
  success: 'LOAD_VIEW_SUCCESS',
  failure: 'LOAD_VIEW_FAILURE'
})

export const save = (value) => ({
  type: 'LOCAL_SET',
  key: 'view',
  value,
  request: 'SAVE_VIEW_REQUEST',
  success: 'SAVE_VIEW_SUCCESS',
  failure: 'SAVE_VIEW_FAILURE'
})

export const clear = () => ({
  type: 'LOCAL_REMOVE',
  key: 'view',
  request: 'CLEAR_VIEW_REQUEST',
  success: 'CLEAR_VIEW_SUCCESS',
  failure: 'CLEAR_VIEW_FAILURE'
})
