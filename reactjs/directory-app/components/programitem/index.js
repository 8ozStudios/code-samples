import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Programitem extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    service_categories: PropTypes.array,
    favorites: PropTypes.object,
    program: PropTypes.object,
    status: PropTypes.string,
    icon: PropTypes.string,
    showDetails: PropTypes.bool
  }

  static defaultProps = {}

  render() {
    const { program, service_categories, showDetails } = this.props
    if( !program ){
      return <div>No programs...</div>
    }
    if( !service_categories ){
      return <div>No categories...</div>
    }
    return (
      <div className="result-row-item" onClick={ this._trackProgramClick( program.title ) }>
        <Link to={`/program/${ program.id }`}>
          <div className={`program-image ${ (program.image || program.logo) ? 'has-image' : 'no-image' }`} style={{ ...this._getBgImageStyle(program) }}>

          </div>
          <div className="program-content">
            <div className="program-top-row">
              { this._getFavoritesIcon( program.id ) }
              <div className="program-name">
                { program.title }
              </div>
              { program.service_categories &&
                <div className="category-icons">
                  { program.service_categories && program.service_categories.map((category_id, index) => (
                    <span key={`result_${index}`}>
                      { category_id != null &&
                        { ...this._displayProgramCategoryIcon(category_id) }
                      }
                    </span>
                  ))}
                </div>
              }
            </div>
            { program.description &&
              <div className="program-desc">
                { (program.description.length < 150) ? program.description : program.description.substring(0,150) + '...' }
              </div>
            }
            <div className="program-details-row">
              { program.address &&
                <div className={`address program-detail ${ (!showDetails) ? 'print-only' : '' }`}>
                  <div className="label">Address:</div>
                  { program.address.street1 && <span>{ program.address.street1 } </span> }
                  { program.address.address2 && <span>{ program.address.address2 } </span> }
                  { program.address.city && <span>{ program.address.city } </span> }
                  { program.address.state && <span>{ program.address.state } </span> }
                  { program.address.zip && <span>{ program.address.zip } </span> }
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
                <div className="program-topic program-detail">
                  <div className="label">Topic:</div>
                  { (program.service_categories) ? this._displayProgramCategories(program.service_categories) : '' }
                </div>
              }
            </div>
          </div>
          <div className="program-arrow">
            <i className="fa fa-chevron-right"></i>
          </div>
        </Link>
      </div>
    )
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

}

export default Programitem
