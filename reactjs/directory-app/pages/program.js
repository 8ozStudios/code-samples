import Profile from '../components/profile'
import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    cards: PropTypes.array,
    cardIndex: PropTypes.number,
    programs: PropTypes.array,
    service_categories: PropTypes.array
  }

  render() {
    return (
      <div className="main-content">
        <Profile {...this._getProfile() } />
      </div>
    )
  }

  _getProfile(){
    const { params, cardIndex, programs, service_categories } = this.props
    return {
      id: parseFloat(params.id),
      cardIndex,
      programs,
      service_categories
    }
  }

}

const mapResourcesToPage = (props, context, page) => {
  return {
    'service_categories' : process.env.API_HOST + '/api/sites/sites/1/types/1/items?'
  }
}

const mapPropsToPage = (props, context, data, page) => ({
  component: Program,
  ...data,
  params: page.params
})

export default Page(mapResourcesToPage, mapPropsToPage)
