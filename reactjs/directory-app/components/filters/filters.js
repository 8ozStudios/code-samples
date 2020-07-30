import { CSSTransition } from 'react-transition-group'
import Checkgroup from '../checkgroup'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    enableFilters: PropTypes.array,
    filters: PropTypes.object,
    service_categories: PropTypes.array,
    showFilter: PropTypes.bool,
    onSetFilter: PropTypes.func,
    onSetFilters: PropTypes.func,
    onChange: PropTypes.func,
    toggleFilter: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { enableFilters, showFilter, toggleFilter, service_categories } = this.props
    return (
      <div>
        <div className={`filter ${ (showFilter) ? 'open' : 'close' }`}>
          <div className="filter-title">
            Filters
            <div className="close-filter" onClick={ toggleFilter.bind(this) }>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="filters-wrapper">
            { service_categories && _.includes(enableFilters, 'service_categories') &&
              <Checkgroup {...this._getFilterCategory() } />
            }
          </div>
        </div>
        <CSSTransition key="fade-filter" in={ showFilter } classNames="visible" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="fade" onClick={ toggleFilter.bind(this) }></div>
        </CSSTransition>
      </div>
    )

  }

  componentDidMount(){
    const { defaultValue, onSetFilters } = this.props
    if( defaultValue ) onSetFilters( defaultValue )
  }

  componentDidUpdate(prevProps){
    const { filters, onChange } = this.props
    if( !_.isEqual(filters, prevProps.filters ) ){
      onChange(filters)
    }
  }

  _getFilterCategory(){
    const { filters, service_categories, enableFilters } = this.props
    return {
      defaultValue: filters.service_categories,
      showArrow: false,
      defaultExpand: (enableFilters.length > 1) ? false : true,
      label: 'Service Categories',
      name: 'service_categories',
      options: service_categories,
      onChange: this._handleChange.bind(this,'service_categories')
    }
  }

  _handleChange(key,value){
    this.props.onSetFilter(key,value)
    this.context.analytics.trackEvent({
      action: 'Filtered Programs',
      category: 'Filter: ' + key,
      label: 'Value: ' + value
    })
  }

}

export default Filters
