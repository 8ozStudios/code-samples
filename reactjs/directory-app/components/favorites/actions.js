
export const load = () => ({
  type: 'LOCAL_GET',
  key: 'favorites',
  request: 'LOAD_FAVORITES_REQUEST',
  success: 'LOAD_FAVORITES_SUCCESS',
  failure: 'LOAD_FAVORITES_FAILURE'
})

export const save = (value) => ({
  type: 'LOCAL_SET',
  key: 'favorites',
  value,
  request: 'SAVE_FAVORITE_REQUEST',
  success: 'SAVE_FAVORITE_SUCCESS',
  failure: 'SAVE_FAVORITE_FAILURE'
})

export const clear = () => ({
  type: 'LOCAL_REMOVE',
  key: 'favorites',
  request: 'CLEAR_FAVORITES_REQUEST',
  success: 'CLEAR_FAVORITES_SUCCESS',
  failure: 'CLEAR_FAVORITES_FAILURE'
})

export const add = (id) => ({
  type: 'ADD',
  id
})

export const remove = (id) => ({
  type: 'REMOVE',
  id
})

export const removeAll = () => ({
  type: 'REMOVE_ALL'
})
