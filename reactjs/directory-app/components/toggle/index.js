import { Factory } from 'redux-rubberstamp'
import Toggle from './toggle'
import * as actions from './actions'
import reducer from './reducer'

export default Factory({
  namespace: 'toggle',
  component: Toggle,
  reducer,
  actions
})
