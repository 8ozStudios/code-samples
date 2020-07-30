import PropTypes from 'prop-types'
import _ from 'lodash'
import React from 'react'

class Map extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    points: PropTypes.array,
    handleClick: PropTypes.func
  }

  static defaultProps = {
    config: {
      center: {
        lat: 42.427368,
        lng: -76.471910
      },
      zoom: 12,
      disableDefaultUI: true
    },
    points: [],
    handleClick: () => {}
  }

  map = null
  markers = []
  _showWindow = this._showWindow.bind(this)

  render() {
    const { points } = this.props
    return (
      <div className="map-wrapper">
        { points.length == 0 &&
          <div className="no-results">
            <div>Sorry, no results match your search - try again!</div>
          </div>
        }
        <div className="map" ref={el => this.el = el}>

        </div>
      </div>
    )
  }

  componentDidMount(){
    const { config } = this.props

    this.map = new window.google.maps.Map(this.el, config)

    this._loadMap()
  }

  componentDidUpdate(prevProps){
    const { points } = this.props

    if(!_.isEqual(points, prevProps.points)) {
      this._loadMap()
    }
  }

  _loadMap(){
    const { points } = this.props

    const bounds = new window.google.maps.LatLngBounds()

    this.markers.map((marker,index) => {
      marker.setMap(null)
    })

    if(points.length > 0){

      points.map((item,index) => {

        const marker = new window.google.maps.Marker({
          position: item.position,
          map: this.map,
          title: item.title,
          icon: item.icon
        })

        this.markers.push(marker)

        marker.addListener('click', this._showWindow.bind(this, item.id))

        bounds.extend({lat: parseFloat(item.position.latitude), lng: parseFloat(item.position.longitude)})
      })

      if(points.length > 1){
        this.map.fitBounds(bounds)
      }

    }
  }

  _showWindow( id ){
    this.props.handleClick(id)
  }
}

export default Map
