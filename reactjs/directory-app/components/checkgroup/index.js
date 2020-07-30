import { Factory } from 'redux-rubberstamp'
import Checkgroup from './checkgroup'
import * as actions from './actions'
import reducer from './reducer'

export default Factory({
  namespace: 'checkgroup',
  component: Checkgroup,
  reducer,
  actions
})
