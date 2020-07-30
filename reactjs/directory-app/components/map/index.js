import { Singleton } from 'redux-rubberstamp'
import Map from './map'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'map',
  component: Map,
  reducer,
  actions
})
