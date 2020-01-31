import React from 'react'
import '../CssFolder/FlightNum.css'
import {aiportFullInfo} from "./AirPortList"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './ModalForm'

class FlightNum extends React.Component {
  state={
    show: false,
    phoneNumber: ""
  }

  handlePhoneForm=()=> {
    this.setState({show: !this.state.show })
  }
  handleSendingSms =(arg)=> {
    arg.preventDefault()
    arg.persist()
    this.props.hadnlephoneNumberFromSearch(arg.target[1].defaultValue, this.props.oneFlight)
    fetch(`http://localhost:3000/flights`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: parseInt(localStorage.user_id),
        airline: this.props.oneFlight.airline,
        arrival: this.props.oneFlight.arrival,
        departure: this.props.oneFlight.departure,
        flightt: this.props.oneFlight.flight,
        status: this.props.oneFlight.status,
        ttype: this.props.oneFlight.type,
        phone_number: arg.target[1].defaultValue
      })})
      .then(resp=> resp.json())
      .then(data => {
        this.handlePhoneForm()
      })
    
    .catch(function(error) {
      alert("Something went wrong");
      console.log(error.message);
    });
  }

  hideModal=()=> {
    this.setState({show: false})
  }

    render(){
       const icaoCodeDeparture = this.props.oneFlight!== null ? this.props.oneFlight.departure.icaoCode : ""
       const departureCityObj = aiportFullInfo.find(flightobj => flightobj.ICAO === icaoCodeDeparture)
       const icaoCodeArrival = this.props.oneFlight!== null ? this.props.oneFlight.arrival.icaoCode : ""
       const arrivalCityObj = aiportFullInfo.find(flightobj => flightobj.ICAO === icaoCodeArrival)
       
    return(

     <div className="boarding-pass" >
      <header>
        <h2>{this.props.oneFlight !== null ? this.props.oneFlight.airline.name : ""}</h2>
        <div className="flight">
          <small style={{color: "white", fontSize: "10px"}} ></small>
          {/* <strong>14K Gold</strong> */}
        </div>
      </header>
      <section className="cities">
        <div className="city">
          <small>Departure</small>
          <strong>{this.props.oneFlight !== null ? this.props.oneFlight.departure.iataCode : ""}</strong>
        <small> { this.props.oneFlight!== null ? departureCityObj.city : ""}</small>
        </div>
        <div className="city" style={{marginBottom: "20"}}>
          <small>Arrival</small>
      <strong>{this.props.oneFlight !== null ? this.props.oneFlight.arrival.iataCode : ""}</strong>
        <small>{ this.props.oneFlight!== null ? arrivalCityObj.city : ''}</small>
        </div>
      </section>
      <section className="infos">
        <div className="places">
          <div className="box">
            <small>Scheduled Departure</small>
              <strong><em>{this.props.oneFlight !== null ? this.props.oneFlight.departure.scheduledTime.slice(11, -4) : ""}</em></strong>
          </div>
          <div className="box">
            <small>TERMINAL NUMBER</small>
            <strong><em>{this.props.oneFlight !== null ? this.props.oneFlight.departure.terminal : ""}</em></strong>
          </div>
          <div className="box">
            <small>DELAY</small>
            <strong>{this.props.oneFlight !== null ? this.props.oneFlight.departure.delay : "NONE"}</strong>
          </div>
          <div className="box">
            <small>GATE   </small>
              <strong>{this.props.oneFlight !== null ? this.props.oneFlight.departure.gate : "NONE"}</strong>
          </div>
        </div>
        <div className="times">
          <div className="box">
            <small>Scheduled Arrival</small>  
              <strong>{this.props.oneFlight !== null ? this.props.oneFlight.arrival.scheduledTime.slice(11, -4) : ""}</strong>
          </div>
          <div className="box">
            <small>TERMINAL NUMBER</small>
                <strong>{this.props.oneFlight !== null ? this.props.oneFlight.arrival.terminal : "NONE"}</strong>
          </div>
          <div className="box">
            <small>DELAY</small>
              <strong>{this.props.oneFlight !== null ? this.props.oneFlight.arrival.delay : "NONE"}</strong>
          </div>
          <div className="box">
            <small>GATE</small>
              <strong>{this.props.oneFlight !== null ? this.props.oneFlight.arrival.gate : "NONE"}</strong>
          </div>
        </div>
      </section>
      <section className="strap">
        <div className="box">
          <div className="passenger">
            <small>STATUS</small>
              <strong >{this.props.oneFlight !== null ? this.props.oneFlight.status : "NONE"}</strong>
          </div>
          <div className="date">
            {/* <small>Dispatch Duration</small>
            <strong>5-7 days</strong> */}
            <Button variant="outline-success" size="lg" onClick={this.handlePhoneForm}>Track this flight</Button>
            <MyVerticallyCenteredModal show={this.state.show} handlePhoneForm={this.handlePhoneForm}
            handleSendingSms={this.handleSendingSms} hideModal={this.hideModal}/>
          </div>
        </div>
      </section>
    </div> 

    )
    }
}

export  default FlightNum




