import Programitem from '../programitem'
import PropTypes from 'prop-types'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Listview extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  static propTypes = {
    service_categories: PropTypes.array,
    favorites: PropTypes.object,
    programs: PropTypes.array,
    status: PropTypes.string,
    notificationPercent: PropTypes.number,
    onLoadMorePrograms: PropTypes.func
  }

  static defaultProps = {
    notificationPercent: 30
  }

  notified = false

  render() {
    const { programs, status } = this.props
    const { favorites } = this.context
    return (
      <div className="list" ref={ (node) => this.scrollpane = node }>
        { programs && programs.map((program, index) => (
          <div className="result-row" key={`result_${index}`}>
            <Programitem { ...this._getProgramItem(program, favorites) } />
          </div>
        )) }
        { status != 'loading' && programs.length < 1 &&
          <div className="no-results">
            Sorry, there are no programs matching your search.
          </div>
        }
        { status == 'loading' || status == 'refreshing' &&
          <div className="ajax-loading">
            <Loader />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.listener = _.throttle(this._scrollListener.bind(this), 100)
    this._attachScrollListener()
  }

  componentDidUpdate() {
    this.notified = false
  }

  componentWillUnmount() {
    this._detachScrollListener()
  }

  _getProgramItem(program, favorites){
    const { service_categories } = this.props
    return {
      program,
      favorites,
      service_categories,
      icon: 'star',
      showDetails: false
    }
  }

  _attachScrollListener() {
    this.scrollpane.addEventListener('scroll', this.listener, true)
    this.scrollpane.addEventListener('resize', this.listener, true)
    this._scrollListener()
  }

  _detachScrollListener() {
    this.scrollpane.removeEventListener('scroll', this.listener, true)
    this.scrollpane.removeEventListener('resize', this.listener, true)
  }

  _scrollListener() {
    const { notificationPercent, status } = this.props
    const bottomPosition = this.scrollpane.scrollHeight - (this.scrollpane.scrollTop + this.scrollpane.offsetHeight)
    const percentRemaining = (bottomPosition / this.scrollpane.scrollHeight) * 100
    if((!this.notified && percentRemaining <= notificationPercent) && (status != 'refreshing' && status != 'loading')) {
      this._reachedThreshold()
      this.notified = true
    }
  }

  _reachedThreshold(){
    this.props.onLoadMorePrograms()
  }

}

export default Listview
