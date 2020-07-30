import { Singleton } from 'redux-rubberstamp'
import Favorites from './favorites'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'favorites',
  component: Favorites,
  reducer,
  actions
})
