import { Singleton } from 'redux-rubberstamp'
import Tileview from './tileview'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'tileview',
  component: Tileview,
  reducer,
  actions
})
