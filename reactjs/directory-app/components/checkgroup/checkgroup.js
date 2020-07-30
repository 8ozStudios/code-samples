import PropTypes from 'prop-types'
import React from 'react'
import Checkbox from '../checkbox'
import _ from 'lodash'

class Checkgroup extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    defaultExpand: PropTypes.bool,
    init: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.array,
    showArrow: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onInit: PropTypes.func,
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onSet: PropTypes.func,
    options: PropTypes.array
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { label, options, name, status, defaultExpand, showArrow, init } = this.props
    return (
      <div className={`filter-item check-group ${ ( defaultExpand || (status == 'open') ) ? 'open' : 'closed' }`}>
        <div className={`filter-subtitle ${ (showArrow) ? 'show-arrow' : 'no-arrow' }`} onClick={ this._handleToggle.bind(this) }>{ label }</div>
        { init && options &&
          <div className="filter-option-wrapper">
            { options.map((option, index) => (
              <Checkbox { ...this._getCheckbox(option, name) } key={`option_${index}`} />
            ))}
          </div>
        }
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue, onInit, onSet, onToggle } = this.props
    if( !defaultValue ) onInit()
    onSet( defaultValue )
    onToggle()
  }

  componentDidUpdate(prevProps){
    const { selected, onChange } = this.props
    if( !_.isEqual(selected, prevProps.selected) ){
      onChange(selected)
    }
  }

  _getCheckbox(option, name){
    return {
      defaultValue: _.includes(this.props.selected, option.id),
      option,
      onChange: this._handleCheck.bind(this, option)
    }
  }

  _handleCheck(option) {
    this.props.onSelect(option.id)
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

export default Checkgroup
