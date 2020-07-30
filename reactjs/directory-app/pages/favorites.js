import Favoriteslist from '../components/favoriteslist'
import Toolbar from '../components/toolbar'
import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Favorites extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    favorites: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    service_categories: PropTypes.array,
    programs: PropTypes.array,
    cardIndex: PropTypes.number
  }

  static defaultProps = {}

  render() {
    const { items, cardIndex } = this.props
    return (
      <div className="main-wrapper">
        <div className="main-content">
          <div className="top-content">
            <div className={`title-wrapper ${ cardIndex > 0 ? 'has-back-btn' : 'no-back-btn' }`}>
              <h2>
                { cardIndex > 0 &&
                  <div className="back-btn" onClick={ this._goBack.bind(this) }>
                    <i className="fa fa-chevron-left"></i>
                  </div>
                }
                Favorite Resources
              </h2>
            </div>
            <div className="button-wrapper">
              <Toolbar { ...this._getToolbar() } />
            </div>
          </div>
          { items &&
            <Favoriteslist {...this._getFavoriteslist() } />
          }
        </div>
      </div>
    )
  }

  _getToolbar(){
    return {
      buttons: [ 'back', 'home', 'clearFavorites', 'print' ],
      doClearFavorites: this.context.favorites.removeAll,
      page:'Favorites List'
    }
  }

  _getFavoriteslist(){
    const { items, programs, service_categories } = this.props
    return {
      items,
      programs,
      service_categories
    }
  }

  _goBack(){
    this.context.router.history.goBack()
  }

}


class FavoritesWrapper extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    const { items } = this.context.favorites
    return (
      <Favorites { ...this.props } items={ items }>
        { this.props.children }
      </Favorites>
    )
  }

}


const mapResourcesToPage = (props, context, page) => ({
  'service_categories' : process.env.API_HOST + '/api/sites/sites/1/types/1/items?$page[limit]=0&$sort=title',
  'programs': process.env.API_HOST + '/api/sites/sites/1/types/2/items?'
})

const mapPropsToPage = (props, context, data, page) => ({
  component: FavoritesWrapper,
  ...data,
  params: page.params
})

export default Page(mapResourcesToPage, mapPropsToPage)
