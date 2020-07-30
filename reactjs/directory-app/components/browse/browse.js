import Programs from '../programs'
import Listview from '../listview'
import Tileview from '../tileview'
import Mapview from '../mapview'
import PropTypes from 'prop-types'
import Toolbar from '../toolbar'
import Filters from '../filters'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Browse extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    buttons: PropTypes.array,
    service_categories: PropTypes.array,
    enableFilters: PropTypes.array,
    filters: PropTypes.object,
    pagination: PropTypes.object,
    programs: PropTypes.array,
    nextPrograms: PropTypes.array,
    query: PropTypes.string,
    title: PropTypes.string,
    showFilter: PropTypes.bool,
    status: PropTypes.string,
    views: PropTypes.array,
    defaultView: PropTypes.string,
    view: PropTypes.string,
    onToggle: PropTypes.func,
    onFetchCategories: PropTypes.func,
    onFetchPrograms: PropTypes.func,
    onFetchMorePrograms: PropTypes.func,
    onFilter: PropTypes.func,
    onToggleFilter: PropTypes.func,
    onToggleView: PropTypes.func,
    onLoad: PropTypes.func,
    onSave: PropTypes.func
  }

  static defaultProps = {
    showFilter: false,
    views: [
      {
        name:'tile',
        title:'Tile',
        icon:'th-large',
        component: Tileview
      },
      {
        name:'list',
        title:'List',
        icon:'list-ul',
        component: Listview
      },
      {
        name:'map',
        title:'Map',
        icon:'globe',
        component: Mapview
      }
    ],
    view: 'tile',
    pagination: {
      all: null,
      limit: 30,
      skip: 0,
      total: null,
      page: 1
    }
  }

  _handleLoadMorePrograms = _.throttle(this._handleLoadMorePrograms.bind(this), 1000, { 'trailing': false })

  render() {
    const { title } = this.props
    return (
      <div className="main-content">
        <div className="top-content">
          <div className="title-wrapper">
            <h2>{title}</h2>
          </div>
          <div className="button-wrapper">
            <Toolbar { ...this._getToolbar() } />
          </div>
        </div>
        <div className="browse">
          <div className="browse-content">
            <Filters { ...this._getFilters() } />
            <Programs { ...this._getPrograms() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { onFilter, onLoad, onFetchPrograms } = this.props
    const filters = this._getFiltersFromQuery()
    onFilter(filters)
    onFetchPrograms(this._buildQuery(false))
    onLoad()
  }

  componentDidUpdate(prevProps) {
    const { query, onFetchPrograms } = this.props
    if(query !== prevProps.query) {
      onFetchPrograms(this._buildQuery(false))
    }
  }

  _toggleFilter(){
    this.props.onToggleFilter()
  }

  _handleLoadMorePrograms(){
    const { onFetchMorePrograms, pagination, status } = this.props
    if((!pagination.total || pagination.skip + pagination.limit <= pagination.total) && (status != 'refreshing' && status != 'loading')){
      onFetchMorePrograms(this._buildQuery(true))
    }
  }

  _buildQuery(next){
    const { query, pagination, view } = this.props
    const params = []
    params.push( '$sort=title' )
    if(view == 'map'){
      params.push( '$page[limit]=0' )
    } else {
      params.push( '$page[limit]=' + pagination.limit )
    }
    if(next) params.push( '$page[skip]=' + (pagination.page * pagination.limit) )
    if(query) params.push( query )
    return params.join('&')
  }

  _getFiltersFromQuery() {
    const { query } = this.props
    if(!query || query == '') return null
    const queryObj = qs.parse(query, { arrayLimit: 100, depth: 10, decoder: (str) => {
      if(str === 'true') return true
      if(str === 'false') return false
      if(str.match(/^\d+$/)) return parseInt(str)
      return str
    } })
    const filter = queryObj['$filters']['$or'].reduce((object, item, i) => {
      return {
        ...object,
        [Object.keys(item)[0]]: [
          ...object[Object.keys(item)[0]] || [],
          ...Object.keys(item).map((key, j) => {
            return Object.values(item[key])[0]
          })
        ]
      }
    }, {})
    return filter
  }

  _getToolbar(){
    const { buttons, onToggleFilter, views, view } = this.props
    return {
      buttons,
      doFilter: onToggleFilter,
      doToggleView: this._handleToggleView.bind(this),
      page: 'All Programs',
      views,
      view
    }
  }

  _handleToggleView(view){
    const { onToggleView, onSave } = this.props
    onToggleView(view)
    onSave(view)
  }

  _getPrograms(){
    const { programs, service_categories, filters, views, defaultView, status } = this.props
    return {
      status,
      programs,
      filters,
      service_categories,
      view: (this.props.view) ? this.props.view : defaultView,
      views,
      onLoadMorePrograms: this._handleLoadMorePrograms.bind(this)
    }
  }

  _getFilters(){
    const { filters, enableFilters, service_categories, showFilter } = this.props
    return {
      defaultValue: this._getFiltersFromQuery(),
      filters,
      enableFilters,
      service_categories,
      onChange: this._handleFilter.bind(this),
      showFilter,
      toggleFilter: this._toggleFilter.bind(this)
    }
  }

  _handleFilter(filters){
    const { history } = this.context.router
    const query = Object.keys(filters).reduce((string, filter, i) => {
      if(filters[filter] && filters[filter].length > 1){
        return string + filters[filter].reduce((string2, filterItem, j) => {
          return string2 + '$filters[$or][' + j + '][' + filter + '][$ct]=' + filterItem + '&'
        }, '')
      } else {
        return string + '$filters[$or][' + i + '][' + filter + '][$ct]=' + filters[filter] + '&'
      }
    }, '?')
    history.replace(history.location.pathname+query)
  }

}

class BrowseWrapper extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  render(){
    const query = this.context.router.history.location.search.substr(1)
    return <Browse query={ query } { ...this.props } />
  }
}

export default BrowseWrapper
