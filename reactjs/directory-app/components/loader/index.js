import React from 'react'

class Loader extends React.Component {

  render() {
    return (
      <div>
        <svg width="115px"  height="115px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-ellipsis">
          <circle cx="84" cy="50" r="0" fill="#3b4368">
            <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
            <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
          </circle>
          <circle cx="42.8192" cy="50" r="10" fill="#5e6fa3">
            <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="-1.2s"></animate>
            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="-1.2s"></animate>
          </circle>
          <circle cx="16" cy="50" r="7.888" fill="#689cc5">
            <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="-0.6s"></animate>
            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="-0.6s"></animate>
          </circle>
          <circle cx="84" cy="50" r="2.112" fill="#93dbe9">
            <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
          </circle>
          <circle cx="76.8192" cy="50" r="10" fill="#3b4368">
            <animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
            <animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.4s" repeatCount="indefinite" begin="0s"></animate>
          </circle>
        </svg>
      </div>
    )
  }

}

export default Loader
