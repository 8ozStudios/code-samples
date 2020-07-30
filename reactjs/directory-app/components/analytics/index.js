import PropTypes from 'prop-types'
import React from 'react'

class Analytics extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  static childContextTypes = {
    analytics: PropTypes.object
  }

  render() {
    return this.props.children
  }

  getChildContext() {
    return {
      analytics: {
        trackEvent: this._handleTrackEvent.bind(this)
      }
    }
  }

  _handleTrackEvent({ action, category, label, value }) {

    if(process.env.NODE_ENV !== 'production') {
      //console.log('Tracked: ', { action, category, label, value })
      return
    }

    const gtag = function() {
      window.dataLayer.push(arguments)
    }

    gtag(
      'event', action, {
        event_category: category,
        event_label: label,
        event_value: value
      }
    )
  }

}


export default Analytics
