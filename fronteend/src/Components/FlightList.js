import React from 'react'
import AirportN from './AirPortN'

// import '../CssFolder/AirPortCard.scss'

class FlightList extends React.Component {

    render(){
        
    return (
        this.props.flightsData.length > 0 
        ? 
        this.props.flightsData.map(flight =>  <AirportN singleFlight={flight} key={flight.name} arrival={this.props.arrival}
             handleOneFlight={this.props.handleOneFlight}/>  )
        :
        ""
    )
    }
}

export default FlightList