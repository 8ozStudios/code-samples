import PropTypes from 'prop-types'
import React from 'react'

class Checkbox extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.bool,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    option: PropTypes.object
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {
    checked: null
  }

  render() {
    const { option } = this.props
    const { checked } = this.state
    const customColorStyle = {
      color: (option.color) ? option.color : '#000000'
    }
    return (
      <div>
        <div className="filter-option"  onClick={ this._handleCheck.bind(this) }>
          <div className={`check-box ${ checked ? 'enable' : 'disable' }`}></div>
          <div className="check-label">
            { option.icon &&
              <i className={`fa ${option.icon}`} style={customColorStyle}></i>
            }
            { option.title }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    if( defaultValue ){
      this.setState({
        checked: defaultValue
      })
    }
  }

  _handleCheck() {
    const { checked } = this.state
    const { onChange } = this.props
    this.setState({
      checked: !checked
    })
    onChange(checked)
  }

}

export default Checkbox
