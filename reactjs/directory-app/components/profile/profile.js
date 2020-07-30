import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Toolbar from '../toolbar'
import React from 'react'
import Map from '../map'
import _ from 'lodash'

class Profile extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    favorites: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number,
    buttons: PropTypes.array,
    cardIndex: PropTypes.number,
    programs: PropTypes.array,
    program: PropTypes.object,
    service_categories: PropTypes.array,
    onFetchPrograms: PropTypes.func
  }

  static defaultProps = {}

  program = null;

  render() {
    const { program, service_categories, cardIndex } = this.props
    return (
      <div className="profile">
        { program && service_categories &&
          <div className="profile-wrapper">
            <Helmet>
              <title>{ program.title } | Tompkins County ReEntry Resources</title>
              <meta name="description" content={ program.description } />
            </Helmet>
            <div className="top-content">
              <div className={`title-wrapper ${ cardIndex > 0 ? 'has-back-btn' : 'no-back-btn' }`}>
                <h2>
                  { cardIndex > 0 &&
                    <div className="back-btn" onClick={ this._goBack.bind(this) }>
                      <i className="fa fa-chevron-left"></i>
                    </div>
                  }
                  { program.title }
                </h2>
              </div>
              <div className="button-wrapper">
                <Toolbar { ...this._getToolbar(program.title) } />
              </div>
            </div>
            <div className="program-row">
              <div className="program-col">
                { program.address &&
                  <div className="address">
                    <div className="label">Address:</div>
                    { program.address.street1 && <span>{ program.address.street1 } </span> }
                    { program.address.street2 && <span>{ program.address.street2 } </span> }
                    { program.address.city && <span>{ program.address.city } </span> }
                    { program.address.state && <span>{ program.address.state } </span> }
                    { program.address.zip && <span>{ program.address.zip } </span> }
                  </div>
                }
                { program.description &&
                  <div className="description">
                    <div className="label">Description:</div> { program.description }
                  </div>
                }
                { program.services &&
                  <div className="service"><div className="label">Services:</div> { program.services }</div>
                }
                { program.website &&
                  <div className="site">
                    <div className="label">Website:</div>
                    <a href={ program.website } target="_blank">{ program.website }</a>
                  </div>
                }
                { (program.primary_contact || program.phone || program.email) &&
                  <div className="contact">
                    <div className="label">Contact Info:</div>
                    { program.primary_contact && <div>{ program.primary_contact }</div> }
                    { program.phone && <div>{ program.phone }</div> }
                    { program.email && <div>{ program.email }</div> }
                  </div>
                }
                { program.cost &&
                  <div className="cost">
                    <div className="label">Cost:</div> { program.cost }<br />
                    { program.cost_notes && <div>{ program.cost_notes }</div> }
                  </div>
                }
                { program.service_categories &&
                  <div className="categories">
                    { this._displayProgramCategories(program.service_categories) }
                  </div>
                }
              </div>
              <div className="program-col">
                { program.image && program.image.url &&
                  <div className="program-image">
                    <img src={program.image.url} alt={program.title} />
                  </div>
                }
                { program.address && program.address.latitude && program.address.longitude &&
                  <Map { ...this._getMap() }/>
                }
                <button className="directions" onClick={ this._getDirectionsLink.bind(this, program) }>
                  Get Directions on Public Transit
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount(){
    const{ id, onFetchPrograms } = this.props
    onFetchPrograms(id)
  }

  _getDirectionsLink(program){
    const address = [program.address_1,program.city,program.state,program.zip].join(', ')
    const escapedAddress = encodeURIComponent(address)
    const url = 'https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=' + escapedAddress
    window.open(url,'_blank')
  }

  _getMap(){
    const{ program } = this.props
    return {
      points: [{
        id: program.id,
        title: program.title,
        position: {
          lat: program.address.latitude,
          lng: program.address.longitude
        }
      }],
      config: {
        center: {
          lat: program.address.latitude,
          lng: program.address.longitude
        },
        zoom: 15,
        disableDefaultUI: true
      }
    }
  }

  _getToolbar(programName){
    const { id } = this.props
    const { favorites } = this.context
    const isFavorite = this._checkFavorite(id, favorites)
    return {
      buttons: ['back','home','favorites','toggleFavorite','print','share'],
      doToggleFavorite: this._handleToggleFavorite.bind(this),
      isFavorite,
      page: 'Program Profile',
      program: programName
    }
  }

  _checkFavorite(id, favorites){
    return _.includes(favorites.items, id) ? true : false
  }

  _handleToggleFavorite(){
    const { id } = this.props
    const { favorites } = this.context
    const selected = this._checkFavorite(id, favorites)
    if( !selected ){
      favorites.add( id )
    } else {
      favorites.remove( id )
    }
  }

  _displayProgramCategories(categoryIds){
    const { service_categories } = this.props
    if( categoryIds.length > 1 ){
      return (
        <div>
          <div className="dot" style={{backgroundColor:'#999999'}}></div>
          <div className="label" style={{color:'#999999'}}>
            Multiple categories
          </div>
        </div>
      )
    } else if( categoryIds.length == 1 ) {
      return (
        <div>
          <div className="dot"></div>
          <div className="label">
            { _.find(service_categories, ['id', parseFloat(categoryIds[0])])['name'] }
          </div>
        </div>
      )
    }
  }

  _goBack(){
    this.context.router.history.goBack()
  }

}

class ProfileWrapper extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  render(){
    return <Profile favorites={ this.context.favorites } { ...this.props } />
  }
}

export default ProfileWrapper
