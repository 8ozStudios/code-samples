import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import Map from '../map'
import _ from 'lodash'

class Mapview extends React.Component {

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
    activeProgram: PropTypes.number,
    onShowProgramDetails: PropTypes.func,
    onCloseWindow: PropTypes.func
  }

  static defaultProps = {
    icon: 'star',
    programs: []
  }

  render() {
    const { programs, activeProgram } = this.props
    return (
      <div className="map-view">
        <Map { ...this._getMap() }/>
        <div className={`info-windows ${ (activeProgram) ? 'visible' : '' }`}>
          { programs && programs.map((item,index) => (
            <div className={`window ${ (item.id == activeProgram) ? 'active' : '' }`} key={`item_${index}`}>

              <div className={`image ${ (item.image_url) ? 'has-image' : 'no-image' }`} data-bg={`${item.image_url}`}>
                <Link to={`/program/${ item.id }`}></Link>
              </div>
              <div className="text">
                <div className="title">
                  { this._getFavoritesIcon( item.id ) }
                  <Link to={`/program/${ item.id }`}>
                    { item.title }
                    { item.service_categories &&
                      <div className="category-icons">
                        { item.service_categories && item.service_categories.map((category_id, index) => (
                          <span key={`result_${index}`}>
                            { category_id != null &&
                              { ...this._displayProgramCategoryIcon(category_id) }
                            }
                          </span>
                        ))}
                      </div>
                    }
                  </Link>
                </div>
                <div className="description">
                  { _.truncate(item.description, {
                    'length': 200,
                    'separator': '...'
                  }) }
                </div>
              </div>
              <div className="buttons">
                <div className="close" onClick={ this._closeWindow.bind(this) }>
                  <i className="fa fa-times-circle"></i>
                </div>
                <div className="arrow">
                  <Link to={`/program/${ item.id }`}>
                    <i className="fa fa-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.programs !== this.props.programs) {
      this.props.onCloseWindow()
    }
  }

  _closeWindow(){
    this.props.onCloseWindow()
  }

  _getMap(){
    const { programs, service_categories } = this.props
    if(!programs) return null
    const points = programs.reduce((points, program) => {
      const category = _.find(service_categories, ['id', parseFloat(program.service_categories)])
      const color = (category) ? category['color'] : '#e3e3e3'
      if( program.address && program.address.latitude && program.address.longitude ){
        points.push({
          id: program.id,
          title: program.title,
          position: {
            lat: program.address.latitude,
            lng: program.address.longitude
          },
          icon: {
            path: 'M0,47 Q0,28 10,15 A15,15 0,1,0 -10,15 Q0,28 0,47',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#333333',
            strokeWeight: 1,
            scale: .6
          }
        })
      }
      return points
    }, [])
    return {
      points,
      handleClick: this._showProgramDetails.bind(this)
    }
  }

  _displayProgramCategoryIcon(category_id){
    const { service_categories } = this.props
    const category = _.find(service_categories, ['id', parseFloat(category_id)])
    const color = {
      color: (category.color) ? category.color : '#000000'
    }
    return (
      <div className="category-icon" style={color}>
        <i className={`fa ${(category.icon) ? category.icon : ''}`}></i>
      </div>
    )
  }

  _showProgramDetails(id){
    this.props.onShowProgramDetails(id)
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
            { _.find(service_categories, ['id', parseFloat(categoryIds[0])])['name'] }
          </div>
        </div>
      )
    } else {
      return ( <div></div> )
    }
  }

  _getBgImageStyle(file){
    if(file){
      return {
        background: `url(${file}) center center / cover no-repeat`
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

}

export default Mapview
