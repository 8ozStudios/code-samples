import { Singleton } from 'redux-rubberstamp'
import Favoriteslist from './favoriteslist'
import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

export default Singleton({
  namespace: 'favoriteslist',
  component: Favoriteslist,
  reducer,
  actions,
  selectors
})
