import { Factory } from 'redux-rubberstamp'
import pageCreator from './switchboard'
import * as actions from './actions'
import reducer from './reducer'
import * as selectors from './selectors'

export const Page = (pageResources, pageProps) => Factory({
  namespace: 'switchboard',
  component: pageCreator(pageResources, pageProps),
  reducer,
  actions,
  selectors
})

export default {
  reducer: {
    'function': reducer,
    'namespace': 'switchboard'
  }
}
