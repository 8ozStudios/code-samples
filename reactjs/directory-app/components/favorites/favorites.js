import PropTypes from 'prop-types'
import React from 'react'

class Favorites extends React.Component {

  static childContextTypes = {
    favorites: PropTypes.object
  }

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    onLoad: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    children: PropTypes.any,
    onSave: PropTypes.func,
    onClear: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return this.props.children
  }

  componentDidMount(){
    const { onLoad } = this.props
    onLoad()
  }

  componentDidUpdate(prevProps){
    const { items, onSave } = this.props
    if( !_.isEqual( prevProps.items, items ) ) {
      onSave( items )
    }
  }

  getChildContext(){
    const { items } = this.props
    return {
      favorites: {
        items,
        add: this._handleAdd.bind(this),
        remove: this._handleRemove.bind(this),
        removeAll: this._handleRemoveAll.bind(this)
      }
    }
  }

  _handleAdd( id ){
    this.props.onAdd(id)
    this.context.analytics.trackEvent({
      action: 'Program Added to Favorites'
    })
  }

  _handleRemove( id ){
    this.props.onRemove(id)
    this.context.analytics.trackEvent({
      action: 'Program Removed from Favorites'
    })
  }

  _handleRemoveAll(){
    this.props.onRemoveAll()
  }



}

export default Favorites
