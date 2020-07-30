import _ from 'lodash'

// import { createSelector } from 'reselect'
//
// const programSelector = (state, props) => props.programs
//
// const filtersSelector = (state, props) => props.filters
//
// const findId = (key, filters, program) => filters[ key ].reduce((found, id) => {
//   return found || _.includes(program[ key ], id)
// }, false)
//
// export const programs = createSelector(
//   programSelector,
//   filtersSelector,
//   (programs, filters) => {
//     if(!programs) return null
//     return programs.filter(program => {
//       if( filters.service_categories && filters.service_categories.length > 0 && !findId('service_categories', filters, program)) return false
//       return true
//     })
//   }
// )
