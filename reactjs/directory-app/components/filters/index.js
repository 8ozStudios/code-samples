import { Singleton } from 'redux-rubberstamp'
import Filters from './filters'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'filters',
  component: Filters,
  reducer,
  actions
})
