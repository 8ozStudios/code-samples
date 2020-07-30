import PropTypes from 'prop-types'
import Page from './page'
import React from 'react'
import _ from 'lodash'

const PageCreator = (mapResourcesToPage, mapPropsToPage) => {

  class Switchboard extends React.Component {

    static propTypes = {
      cardIndex: PropTypes.number,
      data: PropTypes.object,
      params: PropTypes.object,
      pathname: PropTypes.string,
      ready: PropTypes.bool,
      resources: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onReady: PropTypes.func
    }

    static defaultProps = {
      ready: false,
      status:'pending'
    }

    render() {
      const { status } = this.props
      if(!_.includes(['pending','loading','failure','forbidden'], status)) {
        return <Page { ...this._getPage() } />
      }
      if(!_.includes(['pending','loading','refreshing'], status)) {
        return <div>Loading resources...</div>
      }
      return <div></div>
    }

    componentDidMount(){
      this._handleInit()
    }

    _handleInit() {
      if(!mapResourcesToPage) return this._handleReady()
      this._handleFetchResources()
    }

    _handleReady() {
      this.props.onReady()
    }

    _handleFetchResources() {
      const { params, pathname, onFetchResource } = this.props
      const page = { params, pathname }
      if(!mapResourcesToPage) return
      const resources = mapResourcesToPage(this.props, this.context, page)
      Object.keys(resources).map(prop => onFetchResource(prop, resources[prop]))
    }

    _getPage() {
      const { cardIndex, data, params, pathname } = this.props
      const page = { params, pathname }
      const pageProps = mapPropsToPage(this.props, this.context, data, page)
      return {
        ...pageProps,
        cardIndex,
        data,
        page
      }
    }

  }

  return Switchboard

}

export default PageCreator
