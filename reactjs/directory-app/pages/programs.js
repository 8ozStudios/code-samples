import { Page } from '../components/page'
import Browse from '../components/browse'
import React from 'react'

class Programs extends React.Component {

  render() {
    return (
      <Browse { ...this._getBrowse() } />
    )
  }

  _getBrowse(){
    return {
      enableFilters: ['service_categories'],
      title: 'Resources',
      buttons: ['filter','views','favorites','print','share'],
      ...this.props
    }
  }

}


const mapResourcesToPage = (props, context, page) => ({
  'service_categories' : process.env.API_HOST + '/api/sites/sites/1/types/1/items?$page[limit]=0&$sort=title'
})

const mapPropsToPage = (props, context, data, page) => ({
  component: Programs,
  ...data,
  params: page.params
})

export default Page(mapResourcesToPage, mapPropsToPage)
