import { Singleton } from 'redux-rubberstamp'
import Mapview from './mapview'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'mapview',
  component: Mapview,
  reducer,
  actions
})
