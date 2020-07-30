import { Singleton } from 'redux-rubberstamp'
import Profile from './profile'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'profile',
  component: Profile,
  reducer,
  actions
})
