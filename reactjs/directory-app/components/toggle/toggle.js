import PropTypes from 'prop-types'
import React from 'react'

class Toggle extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.bool,
    label: PropTypes.string,
    status: PropTypes.bool,
    onToggle: PropTypes.func,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    namespace: PropTypes.string
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { label, status } = this.props
    return (
      <div className="filter-item toggle" onClick={ this._handleToggle.bind(this) }>
        <div className={`toggle-wrapper ${ status ? 'enable' : 'disable' }`}>
          <div className="toggle-dot"></div>
        </div>
        <span className="toggle-label">{ label }</span>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue, onSet } = this.props
    if( defaultValue ) onSet( defaultValue )
  }

  componentDidUpdate(prevProps){
    const { status, onChange } = this.props
    if( status !== prevProps.status ){
      onChange(status)
    }
  }

  _handleToggle() {
    this.props.onToggle()
  }

}


export default Toggle
