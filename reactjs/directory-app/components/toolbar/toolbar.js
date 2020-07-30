import { CSSTransition } from 'react-transition-group'
import { Twitter, Facebook, Linkedin, Mail } from 'react-social-sharing'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Toolbar extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    buttons: PropTypes.array,
    isFavorite: PropTypes.bool,
    showShare: PropTypes.bool,
    showToggle: PropTypes.bool,
    showView: PropTypes.bool,
    doFilter: PropTypes.func,
    page: PropTypes.string,
    view: PropTypes.string,
    views: PropTypes.array,
    program: PropTypes.string,
    doToggleFavorite: PropTypes.func,
    doClearFavorites: PropTypes.func,
    doPrint: PropTypes.func,
    onToggleShare: PropTypes.func,
    doToggleView: PropTypes.func,
    onToggleView: PropTypes.func
  }

  static defaultProps = {
    doFilter: () => {},
    doToggleFavorite: () => {},
    doClearFavorites: () => {},
    doPrint: () => {},
    doToggleView: () => {},
    showShare: false,
    showView: false,
    page: '',
    program: ''
  }

  render() {
    const { buttons, isFavorite, showShare, showView, views, view } = this.props
    const { cardIndex } = this.context
    return (
      <div>
        <div className="toolbar">
          { cardIndex > 0 &&
            <div className="btn back" onClick={ this._handleBack.bind(this) }>
              <i className="fa fa-chevron-left"></i> Back
            </div>
          }
          { _.includes(buttons, 'home') &&
            <div className="btn all-programs has-link">
              <Link to="/">
                <i className="fa fa-home"></i> All Programs
              </Link>
            </div>
          }
          {
            _.includes(buttons, 'views') &&
            <span className="view-buttons-wrapper">
              <div className="btn change-view" onClick={ this._showViews.bind(this) }>
                <i className="fa fa-clone"></i> View
              </div>
              <div className={`view-buttons ${(showView) ? 'active' : 'inactive' }`}>
                { views.map((item, index) => (
                  <div className={`btn view ${(item.name == view) ? 'active' : 'inactive' }`} key={`view_${index}`} onClick={ this._handleToggleView.bind(this, item.name) }>
                    <i className={`fa fa-${item.icon}`}></i> {item.title}
                  </div>
                )) }
              </div>
            </span>
          }

          { _.includes(buttons, 'filter') &&
            <div className="btn filter" onClick={ this._handleFilter.bind(this) }>
              <i className="fa fa-filter"></i> Filter
            </div>
          }
          { _.includes(buttons, 'favorites') &&
            <div className="btn has-link">
              <Link to="/favorites">
                <i className="fa fa-star"></i> Favorites
              </Link>
            </div>
          }
          { _.includes(buttons, 'toggleFavorite') &&
            <div className="btn" onClick={ this._handleToggleFavorite.bind(this) }>
              { isFavorite &&
                <span>
                  <i className="fa fa-times"></i> Remove Favorite
                </span>
              }
              { !isFavorite &&
                <span>
                  <i className="fa fa-plus"></i> Add Favorite
                </span>
              }
            </div>
          }
          { _.includes(buttons, 'clearFavorites') &&
            <div className="btn" onClick={ this._handleClearFavorites.bind(this) }>
              <i className="fa fa-times"></i> Clear List
            </div>
          }
          { _.includes(buttons, 'print') && (view != 'map') &&
            <div className="btn" onClick={ this._handlePrint.bind(this) }>
              <i className="fa fa-print"></i> Print
            </div>
          }
          { _.includes(buttons, 'share') &&
            <div className="btn" onClick={ this._handleToggleShare.bind(this) }>
              <i className="fa fa-share-alt"></i> Share
            </div>
          }
        </div>
        <div className={`modal-window social-share ${ (showShare) ? 'open' : 'close' }`}>
          <div className="close-filter" onClick={ this._handleToggleShare.bind(this) }>
            <i className="fa fa-times"></i>
          </div>
          <strong>Share this:</strong>
          <div className="share-row" onClick={ this._trackSocialShare('Twitter') }>
            <Twitter link={ window.location.href }/>
          </div>
          <div className="share-row" onClick={ this._trackSocialShare('Facebook') }>
            <Facebook link={ window.location.href } />
          </div>
          <div className="share-row" onClick={ this._trackSocialShare('LinkedIn') }>
            <Linkedin link={ window.location.href } />
          </div>
          <div className="share-row" onClick={ this._trackSocialShare('Email') }>
            <Mail link={ window.location.href } />
          </div>
          <br /><br />
          <em>(FYI: This sharing tool should work but it is still in testing.)</em>
        </div>
        <CSSTransition key="fade-share" in={ showShare } classNames="visible" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="fade" onClick={ this._handleToggleShare.bind(this) }></div>
        </CSSTransition>
      </div>

    )
  }

  _showViews(){
    this.props.onToggleView()
  }

  _handleBack(){
    this.context.router.history.goBack()
  }

  _handleFilter(){
    this.props.doFilter()
  }

  _handleToggleFavorite(){
    this.props.doToggleFavorite()
  }

  _handleClearFavorites(){
    this.props.doClearFavorites()
  }

  _handlePrint(){
    const { page, program } = this.props
    this.context.analytics.trackEvent({
      action: 'Clicked Print',
      category: page,
      label: program
    })
    window.print()
  }

  _handleToggleShare(){
    const { page, program } = this.props
    this.context.analytics.trackEvent({
      action: 'Clicked Share',
      category: page,
      label: program
    })
    this.props.onToggleShare()
  }

  _handleToggleView(view){
    this.props.doToggleView(view)
    if(this.props.showView){
      this.props.onToggleView()
    }
  }

  _trackSocialShare(platform){
    const { page, program } = this.props
    this.context.analytics.trackEvent({
      action: 'Shared on ' + platform,
      category: page,
      label: program
    })
  }

}

export default Toolbar
