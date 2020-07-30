import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Tileview extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object,
    analytics: PropTypes.object
  }

  static propTypes = {
    service_categories: PropTypes.array,
    favorites: PropTypes.object,
    programs: PropTypes.array,
    status: PropTypes.string,
    showDetails: PropTypes.bool,
    icon: PropTypes.string,
    notificationPercent: PropTypes.number,
    onLoadMorePrograms: PropTypes.func
  }

  static defaultProps = {
    status: 'loading',
    icon: 'star',
    notificationPercent: 30
  }

  notified = false

  render() {
    const { programs, showDetails, status } = this.props
    return (
      <div className="tile-view" ref={ (node) => this.scrollpane = node }>
        { programs && programs.map((program, index) => (
          <div className="result-tile" key={`result_${index}`}>
            <div className="result-row-item" onClick={ this._trackProgramClick( program.title ) }>
              <Link to={`/program/${ program.id }`}>
                <div className={`program-image ${ (program.image || program.logo) ? 'has-image' : 'no-image' }`} style={{ ...this._getBgImageStyle(program) }}>
                  { program.service_categories &&
                    <div className="category-icons">
                      { program.service_categories && program.service_categories.map((category_id, index) => (
                        <div key={`result_${index}`}>
                          { this._displayProgramCategoryIcon(category_id) }
                        </div>
                      ))}
                    </div>
                  }
                </div>
                <div className="program-content">
                  <div className="program-top-row">
                    { this._getFavoritesIcon( program.id ) }
                    <div className="program-name">
                      { program.title }
                    </div>
                  </div>
                  <div className="program-details-row">
                    { program.address_1 &&
                      <div className={`address program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Address:</div>
                        { program.address_1 && <span>{ program.address_1 } </span> }
                        { program.address_2 && <span>{ program.address_2 } </span> }
                        { program.city && <span>{ program.city } </span> }
                        { program.state && <span>{ program.state } </span> }
                        { program.zip && <span>{ program.zip } </span> }
                      </div>
                    }
                    { program.description &&
                      <div className={`description program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Description:</div> { program.description }
                      </div>
                    }
                    { (program.services) &&
                      <div className={`service program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Services:</div>
                        { program.services }
                      </div>
                    }
                    { (program.website) &&
                      <div className={`site program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Website:</div>
                        { program.website }
                      </div>
                    }
                    { ( (program.primary_contact || program.phone || program.email)) &&
                      <div className={`contact program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Contact:</div>
                        { program.primary_contact && <div>{ program.primary_contact }</div> }
                        { program.phone && <div>{ program.phone }</div> }
                        { program.email && <div>{ program.email }</div> }
                      </div>
                    }
                    { (program.cost) &&
                      <div className={`cost program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Cost:</div> { program.cost }<br />
                        { program.cost_notes && <div>{ program.cost_notes }</div> }
                      </div>
                    }
                    { program.service_categories &&
                      <div className={`program-topic ${ (!showDetails) ? 'print-only' : '' }`}>
                        <div className="label">Topic:</div>
                        { (program.service_categories) ? this._displayProgramCategories(program.service_categories) : '' }
                      </div>
                    }
                  </div>
                </div>
              </Link>
            </div>
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

  _getFavoritesIcon( programId ){
    const { items } = this.props.favorites
    const { icon } = this.props
    const selected = (_.includes(items, programId)) ? true : false
    const classes = (selected) ? ' selected ' : ''
    return (
      <i className={`favorite-icon fa fa-${icon} ${classes}`} onClick={ this._handleToggleFavorite.bind(this, programId, selected ) }></i>
    )
  }

  _handleToggleFavorite( programId, selected, e ){
    const { favorites } = this.props
    if( !selected ){
      favorites.add( programId )
    } else {
      favorites.remove( programId )
    }
    e.preventDefault()
  }

  _displayProgramCategoryIcon(category_id){
    const { service_categories } = this.props
    const category = _.find(service_categories, ['id', parseFloat(category_id)])
    if(!category) return null
    const color = {
      color: (category.color) ? category.color : '#000000'
    }
    return (
      <div className="category-icon" style={color}>
        <i className={`fa ${(category.icon) ? category.icon : ''}`}></i>
      </div>
    )
  }

  _displayProgramCategories(categoryIds){
    const { service_categories } = this.props
    if( categoryIds.length > 1 ){
      return (
        <div>
          <div className="category" style={{color:'#999999'}}>
            Multiple categories
          </div>
        </div>
      )
    } else if( categoryIds.length == 1 ) {
      return (
        <div>
          <div className="category">
            { _.find(service_categories, ['id', parseFloat(categoryIds[0])])['title'] }
          </div>
        </div>
      )
    } else {
      return ( <div></div> )
    }
  }

  _getBgImageStyle(program){
    const file = (program.image) ? program.image : program.logo
    const bgsize = (program.image) ? 'cover' : 'contain'
    if(file){
      return {
        background: `url(${file.url}) center center / ${bgsize} no-repeat`
      }
    } else {
      return {
        backgroundColor: '#e3e3e3'
      }
    }
  }

  _trackProgramClick( programName ){
    this.context.analytics.trackEvent({
      action: 'Clicked on Program',
      label: programName
    })
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
    console.log('this.scrollpane.scrollHeight is ', this.scrollpane.scrollHeight)
    console.log('bottomPosition is ', bottomPosition)
    console.log('percentRemaining is ', percentRemaining)
    console.log('status is ', status)
    if((!this.notified && percentRemaining <= notificationPercent) && (status != 'refreshing' && status != 'loading')) {
      this._reachedThreshold()
      this.notified = true
    }
  }

  _reachedThreshold(){
    this.props.onLoadMorePrograms()
  }

}

export default Tileview
