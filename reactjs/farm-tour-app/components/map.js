import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { data } from '../../data/data'
import {GoogleApiWrapper} from 'google-maps-react'

class Map extends React.Component {

  static propTypes = {
    farms: PropTypes.array,
    markets: PropTypes.array,
    colors: PropTypes.array,
    google: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    locations: []
  }

  render() {
    return (
      <div id="map-wrapper" ref='map'>
        Loading map...
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap()
    }
  }

  componentDidMount() {
    this.loadMap()
  }

  loadMap() {
    const { farms, markets, colors } = this.props

    if (this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      let zoom = 14
      let lat = 42.439172
      let lng = -76.497664
      const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        disableDefaultUI: true
      })
      this.map = new maps.Map(node, mapConfig)

      const bounds = new maps.LatLngBounds()

      if( farms ){
        const pinSymbol = (index) => ({
          path: 'M0,47 Q0,28 10,15 A15,15 0,1,0 -10,15 Q0,28 0,47',
          fillColor: (colors) ? (colors[ Math.floor((index / 1) % 10) ]) : '#DB2828',
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 1,
          scale: .75,
          labelOrigin: new google.maps.Point(0,2)
        })

        farms.map((location, index) => {
          if( location.lat && location.lng ){

            const marker = new google.maps.Marker({
              position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
              map: this.map,
              label: (farms.length < 2) ? ('') : (index+1).toString(),
              title: location.Name,
              icon: pinSymbol(index)
            })
            bounds.extend({lat: parseFloat(location.lat), lng: parseFloat(location.lng)})

            if(farms.length == 1){
              this.map.setCenter(new google.maps.LatLng(parseFloat(location.lat), parseFloat(location.lng)))
              const listener = google.maps.event.addListener(map, "idle", function() {
                this.map.setZoom(11)
                google.maps.event.removeListener(listener)
              })
            } else {
              const classStr = 'farm' + location.farmId + 'link'
              const onClick = 'document.getElementsByClassName(\'' + classStr + '\')[0].click()'
              const tooltipText = location.Name + ' &raquo;'
              const infowindow = new google.maps.InfoWindow({
                content: ('<div class="tooltip" onclick="' + onClick + '">' + tooltipText + '</div>')
              })
              marker.addListener('click', function() {
                infowindow.open(this.map, marker)
              })
            }
          }
        })
      }

      if(markets){
        const foodSymbol = (index) => ({
          path: 'M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z',
          fillColor: (colors) ? (colors[ Math.floor((index / 1) % 10) ]) : '#DB2828',
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 1,
          scale: .75,
          labelOrigin: new google.maps.Point(0,2)
        })
        markets.map((location, index) => {
          if( location.lat && location.lng ){

            const marker = new google.maps.Marker({
              position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
              map: this.map,
              title: location.Name,
              icon: foodSymbol(index)
            })
            bounds.extend({lat: parseFloat(location.lat), lng: parseFloat(location.lng)})

            if(markets.length == 1){
              this.map.setCenter(new google.maps.LatLng(parseFloat(location.lat), parseFloat(location.lng)))
              const listener = google.maps.event.addListener(map, "idle", function() {
                this.map.setZoom(11)
                google.maps.event.removeListener(listener)
              })
            } else {
              const classStr = 'market' + location.marketId + 'link'
              const onClick = 'document.getElementsByClassName(\'' + classStr + '\')[0].click()'
              const tooltipText = location.Name + ' &raquo;'
              const infowindow = new google.maps.InfoWindow({
                content: ('<div class="tooltip" onclick="' + onClick + '">' + tooltipText + '</div>')
              })
              marker.addListener('click', function() {
                infowindow.open(this.map, marker)
              })
            }
          }
        })
      }

      this.map.fitBounds(bounds);
    }
  }

}

export default Map
