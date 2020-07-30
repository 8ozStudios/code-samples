export const setFilter = (key,value) => ({
  type: 'SET_FILTER',
  key,
  value
})

export const setFilters = (filters) => ({
  type: 'SET_FILTERS',
  filters
})
