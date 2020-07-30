import { Singleton } from 'redux-rubberstamp'
import Browse from './browse'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'browse',
  component: Browse,
  reducer,
  actions
})
