import { Link } from 'react-router-dom'
import React from 'react'
import { data } from '../../data/data'
import GoogleContainer from '../components/googlecontainer.js'
import _ from 'lodash'
import { getSlider } from 'simple-slider'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

class Market extends React.Component {

  constructor(props) {
    super(props)
    const { params } = this.props
    this.market = _.find(data.markets, ['marketId', parseFloat(params.id)])
  }

  render() {
    const { market } = this
    return (
      <div className="app-wrapper">
        <div className="app">
          <Header />
          <main>
            <div className="component-wrapper farm">
              <Link className="back-link" to={`/tours/${ market.tourId }`}>&laquo;</Link>
              <div className="main-content">
                <div className="farm-wrapper">
                  { market.Image_1 &&
                    <div className="farm-hero" data-simple-slider>
                        <div style={{ ...this._getSliderBgStyle(market.Image_1) }}></div>
                        { market.Image_2 &&
                          <div style={{ ...this._getSliderBgStyle(market.Image_2) }}></div>
                        }
                        { market.Image_3 &&
                          <div style={{ ...this._getSliderBgStyle(market.Image_3) }}></div>
                        }
                    </div>
                  }
                  { ( !market.Image_1 && market.lat && market.lng ) &&
                    <div className="farm-hero">
                      { <GoogleContainer { ...this._getGoogleContainer(market) } /> }
                    </div>
                  }
                  <div className="farm-info">
                    <h2>
                      { market.Name }
                    </h2>
                    <div className="address">
                      { market.Owners }<br />
                      { market.Address }<br />
                      { market.City }, NY { market.Zip }
                    </div>
                    <div className="description">
                      { market.Description }
                    </div>
                    <div className="features-row">
                      { (market.Bathroom && market.Bathroom != 'false') &&
                        <span className="icon bathroom-icon"></span>
                      }
                      { (market.Accessible && market.Accessible != 'false') &&
                        <span className="icon accessible-icon"></span>
                      }
                    </div>
                    <div className="button-row">
                      { market.URL &&
                        <div className="button-column">
                          <a href={`${ market.URL }`} target="_blank">Market Website</a>
                        </div>
                      }
                      <div className="button-column">
                        <a href={ this._getDirectionsLink(market) } target="_blank">Directions</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { market } = this
    if( market.Image_1 ){
      getSlider({
        delay:4
      })
    }
  }

  _getSliderBgStyle(file){
    return {
      background: `url(${file}) no-repeat center center`,
      backgroundSize: 'cover'
    }
  }

  _getGoogleContainer(market){
    const markets = [
      market
    ]
    return {
      markets
    }
  }

  _getDirectionsLink(market){
    const addressArray = [ market.Address, market.City, 'NY', market.Zip ]
    return 'https://www.google.com/maps/place/' + encodeURI(addressArray.join(' '))
  }

}

export default Market
