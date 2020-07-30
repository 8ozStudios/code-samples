import { Singleton } from 'redux-rubberstamp'
import Toolbar from './toolbar'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'toolbar',
  component: Toolbar,
  reducer,
  actions
})
