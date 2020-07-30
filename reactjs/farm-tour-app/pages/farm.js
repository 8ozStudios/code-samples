import { Link } from 'react-router-dom'
import React from 'react'
import { data } from '../../data/data'
import GoogleContainer from '../components/googlecontainer.js'
import _ from 'lodash'
import { getSlider } from 'simple-slider'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

class Farm extends React.Component {

  constructor(props) {
    super(props)
    const { params } = this.props
    this.farm = _.find(data.farms, ['farmId', parseFloat(params.id)])
    console.log(this.farm)
  }

  render() {
    const { farm } = this
    return (
      <div className="app-wrapper">
        <div className="app">
          <Header />
          <main>
            <div className={`component-wrapper farm farm${ farm.farmId }`}>
              <Link className="back-link" to={`/tours/${ farm.tourId }`}>&laquo;</Link>
              <div className="main-content">
                <h2>
                  { this._displayTourDate(this.farm.tourId) } Noon-4 PM
                </h2>
                <div className="farm-wrapper">
                  { farm.Image_1 &&
                    <div className="farm-hero">
                        <div style={{ ...this._getSliderBgStyle(farm.Image_1) }}></div>
                        { farm.Image_2 &&
                          <div style={{ ...this._getSliderBgStyle(farm.Image_2) }}></div>
                        }
                        { farm.Image_3 &&
                          <div style={{ ...this._getSliderBgStyle(farm.Image_3) }}></div>
                        }
                    </div>
                  }
                  { ( !farm.Image_1 && farm.lat && farm.lng ) &&
                    <div className="farm-hero">
                      { <GoogleContainer { ...this._getGoogleContainer(farm) } /> }
                    </div>
                  }
                  <div className="farm-info">
                    <h2>
                      { farm.Name }
                    </h2>
                    <div className="address">
                      { farm.Owners }<br />
                      { farm.Address }<br />
                      { farm.City }, NY { farm.Zip }
                    </div>
                    <div className="description">
                      { farm.Description.split('\n').map((text, index) => (
                        <span key={`text_${index}`}>{ text }<br /></span>
                      )) }
                    </div>
                    <div className="features-row">
                      { farm.Features &&
                        <div className="">
                          <span className="icon feature-icon"></span><strong>Features:</strong> { farm.Features }
                        </div>
                      }
                      { farm.Animals &&
                        <div className="">
                          <span className="icon animal-icon"></span><strong>Animals:</strong> { farm.Animals }
                        </div>
                      }
                      { farm.Products_For_Sale &&
                        <div className="">
                          <span className="icon product-icon"></span><strong>Products:</strong> { farm.Products_For_Sale }
                        </div>
                      }
                      { (farm.Bathroom && farm.Bathroom != 'false') &&
                        <span className="icon bathroom-icon"></span>
                      }
                      { (farm.Accessible && farm.Accessible != 'false') &&
                        <span className="icon accessible-icon"></span>
                      }
                    </div>
                    { farm.Product_1 &&
                      <div className="products">
                        Products: { this._displayProducts(farm) }
                      </div>
                    }
                    <div className="button-row">
                      { farm.URL &&
                        <div className="button-column">
                          <a href={`${ farm.URL }`} target="_blank">Website</a>
                        </div>
                      }
                      { farm.URL_2 &&
                        <div className="button-column">
                          <a href={`${ farm.URL_2 }`} target="_blank">Facebook</a>
                        </div>
                      }
                      <div className="button-column">
                        <a href={ this._getDirectionsLink(farm) } target="_blank">Directions</a>
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
    const { farm } = this
    if( farm.Image_1 ){
      getSlider({
        container: document.querySelector('.farm' + farm.farmId + ' .farm-hero'),
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

  _getGoogleContainer(farm){
    const farms = [
      farm
    ]
    return {
      farms
    }
  }

  _displayTourDate(tourId){
    if(tourId === 1 || tourId === '1'){
      return 'Saturday Tour 8/10'
    } else {
      return 'Sunday Tour 8/11'
    }
  }

  //TODO This is duplicated in tour.js
  _displayProducts(farm){
    const productArray = [ farm.Product_1, farm.Product_2, farm.Product_3, farm.Product_4, farm.Product_5, farm.Product_6 ]
    return _.compact(productArray).join(', ')
  }

  _getDirectionsLink(farm){
    const addressArray = [ farm.Address, farm.City, 'NY', farm.Zip ]
    return 'https://www.google.com/maps/place/' + encodeURI(addressArray.join(' '))
  }

}

export default Farm
