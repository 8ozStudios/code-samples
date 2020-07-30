import { Singleton } from 'redux-rubberstamp'
import Listview from './listview'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'listview',
  component: Listview,
  reducer,
  actions
})
