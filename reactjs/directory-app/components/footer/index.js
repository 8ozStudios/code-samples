import React from 'react'

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="print-only">
          Source: {document.location.href}
        </div>
      </footer>
    )
  }

}

export default Footer
