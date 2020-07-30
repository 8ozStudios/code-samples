import Footer from '../footer'
import Header from '../header'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.Component {

  static propTypes = {
    cardIndex: PropTypes.number,
    component: PropTypes.any,
    data: PropTypes.object,
    page: PropTypes.object
  }

  render() {
    const Component = this.props.component
    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Resources for ReEntry Support</title>
        </Helmet>
        <Header />
        <div className="main-wrapper">
          { Component && <Component { ...this._getComponent() } /> }
        </div>
        <Footer />
      </div>
    )
  }

  _getComponent() {
    const { cardIndex, data, page } = this.props
    return {
      ...this.props,
      cardIndex,
      page,
      ...data
    }
  }

  _getMenu(){
    return {
      ...this.props
    }
  }

}

export default Page
