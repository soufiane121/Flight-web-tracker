import React from 'react'
import '../CssFolder/AirPortCard.scss'

class AirportN extends React.Component {

    render(){
        
    return ( 
        
        <div className="container" onClick={()=> this.props.handleOneFlight(this.props.singleFlight)}>
          <div className="card2">

            <h3>{this.props.singleFlight.airline.name}</h3>
            <h3 >Flight N: {this.props.singleFlight.flight.iataNumber}</h3>
            <p className="small" style={{fontSize: 20, color: 'green'}}>{this.props.singleFlight.status.charAt(0).toUpperCase() + this.props.singleFlight.status.slice(1)}</p>
            <p> Gate {
            this.props.arrival !== null 
            ?
            this.props.singleFlight.arrival.gate 
            : 
            this.props.singleFlight.departure.gate
            }</p>
            {/* <div className="go-corner" href="#"> */}
            <div className="go-arrow">
                →
            </div>
            {/* </div> */}
          </div>
              {/* </div> */}
        </div>
    )
    }
}

export default AirportN