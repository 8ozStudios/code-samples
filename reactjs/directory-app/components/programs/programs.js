import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Programs extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  static propTypes = {
    service_categories: PropTypes.array,
    favorites: PropTypes.array,
    programs: PropTypes.array,
    status: PropTypes.string,
    view: PropTypes.string,
    views: PropTypes.array,
    defaultView: PropTypes.string,
    onLoadMorePrograms: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { views, view } = this.props
    const selectedView = _.find(views, ['name', view])
    if(!selectedView) return null
    const View = selectedView.component
    return (
      <div className="viewWrapper">
        <View { ...this._getView() } value={ selectedView.name }/>
      </div>
    )
  }

  _getView(){
    const { programs, service_categories, status } = this.props
    const { favorites } = this.context
    return {
      status,
      programs,
      favorites,
      service_categories,
      onLoadMorePrograms: this._handleLoadMorePrograms.bind(this)
    }
  }

  _handleLoadMorePrograms(){
    this.props.onLoadMorePrograms()
  }

}

class ProgramsWrapper extends React.Component {

  static contextTypes = {
    items: PropTypes.array
  }

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <Programs { ...this.props }>
        { this.props.children }
      </Programs>
    )
  }

}

export default ProgramsWrapper
