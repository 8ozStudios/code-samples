import Programitem from '../programitem'
import PropTypes from 'prop-types'
import React from 'react'

class Favoriteslist extends React.Component {

  static contextTypes = {
    favorites: PropTypes.object
  }

  static propTypes = {
    service_categories: PropTypes.array,
    favorites: PropTypes.array,
    programs: PropTypes.array,
    status: PropTypes.string
    // onFetchCategories: PropTypes.func,
    // onFetchPrograms: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { programs, service_categories } = this.props
    const { favorites } = this.context
    return (
      <div className="favorites-list">
        { programs && service_categories &&
          <div className="program-results">
            { programs.map((program, index) => (
              <div className="result-row" key={`result_${index}`}>
                <Programitem { ...this._getProgramItem(program, favorites) } />
              </div>
            )) }
            { favorites.items.length < 1 &&
              <div className="no-results">
                <strong>You havent selected any favorites!</strong>
                <br /><br />
                Go back home to view all resources and click the grey star to add any item to your favorites list.
              </div>
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount(){
    //const { onFetchCategories, onFetchPrograms } = this.props
    //onFetchPrograms()
    //onFetchCategories()
    //console.log('in favlist didmount - state.programs is ', this.state.programs)
    //console.log('in favlist didmount - props.items is ', this.props.items)
  }

  componentDidUpdate(){
    //console.log('in favlist didmount - state.programs is ', this.state.programs)
    //console.log('in favlist didmount - props.items is ', this.props.items)
  }

  _getProgramItem(program, favorites){
    const { service_categories } = this.props
    return {
      program,
      favorites,
      service_categories,
      icon: 'times',
      showDetails: true
    }
  }

}


export default Favoriteslist
