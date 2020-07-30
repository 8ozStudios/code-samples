export const select = (id) => ({
  type: 'SELECT',
  id
})

export const set = (selected) => ({
  type: 'SET',
  selected
})

export const toggle = () => ({
  type: 'TOGGLE'
})

export const init = () => ({
  type: 'INIT'
})
