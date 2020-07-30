import { Link } from 'react-router-dom'
import React from 'react'
import { data } from '../../data/data'
import GoogleContainer from '../components/googlecontainer.js'
import _ from 'lodash'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

class Tour extends React.Component {

  render() {
    const { params } = this.props
    const farms = _.sortBy(_.filter(data.farms, ['tourId', parseFloat(params.id)]), ['Name'])
    const markets = _.sortBy(_.filter(data.markets, ['tourId', parseFloat(params.id)]), ['Name'])
    const colors = ['#DB2828','#F2711C','#FBBD08','#B5CC18','#21BA45','#00B5AD','#2185D0','#8761d9','#A333C8','#E03997']
    const circleStyle = (index) => ({
      backgroundColor: colors[ Math.floor((index) % 10)]
    })
    return (
      <div className="app-wrapper">
        <div className="app">
          <Header />
          <main>
            <div className="component-wrapper tour">
              <Link className="back-link" to="/">&laquo;</Link>
              <div className="main-content">
                <h2>
                  { this._displayTourDate(params.id) } Noon-4 PM
                </h2>
                { farms &&
                  <div>
                    <div className="hero farms-map">
                      { <GoogleContainer { ...this._getGoogleContainer(farms,markets,colors) } /> }
                    </div>
                    <div className="info farm-list-wrapper">
                      { farms.map((farm, index) => (
                        <div className="farm-row" data-farm={`${farm.farmId}`} key={`farm_${index}`}>
                          <div className="farm-content">
                            <Link className={`farm${farm.farmId}link`} to={`/farms/${ farm.farmId }`}>
                              <div className="farm-name">
                                <div className="circle" style={circleStyle(index)}>
                                  { index+1 }
                                </div>
                                { farm.Name }
                              </div>
                              { farm.Address &&
                                <div>{farm.Address}</div>
                              }
                              { farm.City
                                ? farm.City + ', NY '
                                : 'NY '
                              }
                              { farm.Zip &&
                                farm.Zip
                              }
                              { (farm.Animals || farm.Products_For_Sale || farm.Bathroom || farm.Accessible) &&
                                <div className="icon-row">
                                  { (farm.Animals && farm.Animals != 'false') &&
                                    <span className="icon animal-icon"></span>
                                  }
                                  { (farm.Products_For_Sale && farm.Products_For_Sale != 'false') &&
                                    <span className="icon product-icon"></span>
                                  }
                                  { (farm.Bathroom && farm.Bathroom != 'false') &&
                                    <span className="icon bathroom-icon"></span>
                                  }
                                  { (farm.Accessible && farm.Accessible != 'false') &&
                                    <span className="icon accessible-icon"></span>
                                  }
                                </div>
                              }
                            </Link>
                          </div>
                          <div className="farm-arrow">
                            <Link to={`/farms/${ farm.farmId }`}></Link>
                          </div>
                        </div>
                      )) }
                      { false &&
                        <div className="list-title">
                          Breakfast Stops:
                        </div>
                      }
                      { false && markets.map((market, index) => (
                        <div className="farm-row" data-farm={`${market.marketId}`} key={`market_${index}`}>
                          <div className="farm-content">
                            <Link className={`market${market.marketId}link`} to={`/markets/${ market.marketId }`}>
                              <div className="farm-name">
                                <div className="circle" style={circleStyle(index)}>
                                  <div className="svg-wrapper">
                                    <svg className="icon icon-spoon-knife">
                                      <path d="M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z"></path>
                                    </svg>
                                  </div>
                                </div>
                                { market.Name }
                              </div>
                              { market.Address &&
                                <div>{market.Address}</div>
                              }
                              { market.City
                                ? market.City + ', NY '
                                : 'NY '
                              }
                              { market.Zip &&
                                market.Zip
                              }
                              { (market.Bathroom || market.Accessible) &&
                                <div className="icon-row">
                                  { (market.Bathroom && market.Bathroom != 'false') &&
                                    <span className="icon bathroom-icon"></span>
                                  }
                                  { (market.Accessible && market.Accessible != 'false') &&
                                    <span className="icon accessible-icon"></span>
                                  }
                                </div>
                              }
                            </Link>
                          </div>
                          <div className="farm-arrow">
                            <Link to={`/markets/${ market.marketId }`}></Link>
                          </div>
                        </div>
                      )) }
                    </div>
                  </div>
                }
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  _getGoogleContainer(farms,markets,colors){
    return {
      farms,
      markets,
      colors
    }
  }

  _getMap(){
    return {
      apikey:''
    }
  }

  //TODO This is duplicated in tour.js
  _displayProducts(farm){
    const productArray = [ farm.Product_1, farm.Product_2, farm.Product_3, farm.Product_4, farm.Product_5, farm.Product_6 ]
    return _.compact(productArray).join(', ')
  }

  _displayTourDate(tourId){
    if(tourId === 1 || tourId === '1'){
      return 'Saturday Tour 8/10'
    } else {
      return 'Sunday Tour 8/11'
    }
  }

  _getTour(tourId){
    return farms[tourId]
  }

}

export default Tour
