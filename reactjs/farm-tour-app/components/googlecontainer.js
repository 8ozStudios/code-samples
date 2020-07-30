import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './map'

export class GoogleContainer extends React.Component {

  render() {
    return (
      <div id="google-container">
        <Map google={this.props.google} { ...this._getMap() } />
      </div>
    )
  }

  _getMap(){
    const { farms, markets, colors } = this.props
    return {
      farms,
      markets,
      colors
    }
  }

}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAQNa8mE6dISSpIH18SGy1jc2vPlOCPF0Q')
})(GoogleContainer)
