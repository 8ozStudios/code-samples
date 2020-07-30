import _ from 'lodash'

import { createSelector } from 'reselect'

const programSelector = (state, props) => props.programs

const favoritesSelector = (state, props) => props.items

export const programs = createSelector(
  programSelector,
  favoritesSelector,
  (programs, favorites) => {
    if(!programs) return null
    if(!favorites) return true
    return programs.filter(program => {
      if( _.includes(favorites, program.id) ){
        return true
      }
    })
  }
)
