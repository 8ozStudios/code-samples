import { Singleton } from 'redux-rubberstamp'
import Programs from './programs'
import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

export default Singleton({
  namespace: 'programs',
  component: Programs,
  reducer,
  actions,
  selectors
})
