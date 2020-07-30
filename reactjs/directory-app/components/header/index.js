import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  state = {
    showMenu: false
  }

  render() {
    const { showMenu } = this.state
    return (
      <header>
        <div className="logo-wrapper">
          <Link to="/">
            <img src="/images/logo.png" alt="Tompkins County Reentry Logo - Image of a handshake" width="100"></img>
            Tompkins County ReEntry Directory
          </Link>
        </div>
        <div>
          <div className="nav-wrapper">
            <div className="nav-btn ui button" onClick={ this._toggleMenu.bind(this) }>
              <i className="fa fa-bars"></i>
            </div>
            <nav className={`${ showMenu ? 'open' : 'close' }`}>
              <div className="ui secondary pointing menu">
                <div className="close-filter" onClick={ this._toggleMenu.bind(this) }>
                  <i className="fa fa-times"></i>
                </div>
                <div className="right menu">
                  <Link to="/programs" className="ui item">
                    Directory
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <CSSTransition key="fade-nav" in={ showMenu } classNames="visible" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="fade" onClick={ this._toggleMenu.bind(this) }></div>
          </CSSTransition>
        </div>
      </header>
    )
  }

  _toggleMenu(){
    const { showMenu } = this.state
    this.setState({
      showMenu: !showMenu
    })
  }

}

export default Header
