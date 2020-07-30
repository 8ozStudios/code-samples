
export const fetchPrograms = (id) => ({
  type: 'API_REQUEST',
  endpoint: process.env.API_HOST + '/api/sites/sites/1/types/2/items/' + id,
  request: 'FETCH_PROGRAM_REQUEST',
  success: 'FETCH_PROGRAM_SUCCESS',
  failure: 'FETCH_PROGRAM_FAILURE'
})
