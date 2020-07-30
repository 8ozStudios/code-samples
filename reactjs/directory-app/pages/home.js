import Header from '../components/header'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import React from 'react'

class Home extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="main-content">
          <div className="intro-wrapper">
            <h2>
              Welcome to the Tompkins County ReEntry Resource Directory
            </h2>
          </div>
          <p>
            A description of this website will go here.
          </p>
          <div className="buttom-row">
            <Link to="/programs">
              Browse Programs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

export default Home
