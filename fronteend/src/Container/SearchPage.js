import React from 'react'
import FlightNum from '../Components/FlightNum'
import AirportN from '../Components/AirPortN'
import TestAuto from '../Components/AutoComleteFlightList'
import FlightList from '../Components/FlightList'
import { Route, Switch} from 'react-router-dom'
import SearchByF from '../Components/SearchByF'
import SearchBtn from '../Components/SearchBtn'


class SearchPage extends React.Component {

    state={
        AirportNum: null,
        departure: null,
        arrival: null,
        flightsData: [],
        oneFlight: null,
        flightInfo: null,
        singleFlightObj: null,
        flightNum: null,
        currentFlight: {},
        phoneNumberFromSearch: null,
        lastElementId: null,
    }

    handleAirPortNumberSubmite = (code, arg2, arg3 )=>{
        if (arg3 === "arrival") {
            this.setState({arrival: arg3, departure: '', flightsData: ""})
        } else if (arg3 === "departure") {
            this.setState({departure: arg3, arrival: '', flightsData: '' })
        }
        this.setState({ AirportNum: code})
        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.AirportNum !== this.state.AirportNum || prevState.arrival !== this.state.arrival || prevState.departure !== this.state.departure) {
            this.fetching()
        }
    }

    fetching =()=>{
        fetch(`http://aviation-edge.com/v2/public/timetable?key=d3c2ac-8b1b5c&iataCode=${this.state.AirportNum}&type=${
            this.state.arrival 
            ?
            this.state.arrival 
            :
            this.state.departure 
        }`) 
        .then(resp => resp.json())
        .then(data=> this.setState({flightsData: data}, function(){
            this.props.history.push("/flights")
        }))
    }

    handleOneFlight=(arg)=>{
        this.setState({ oneFlight: arg})
        this.props.history.push('/details')
    }

    handleSearchByFlightNum =(arg)=> {
     fetch(`http://aviation-edge.com/v2/public/timetable?key=d3c2ac-8b1b5c&flight_iata=${arg}`)
     .then(resp => resp.json() )
     .then(data => this.setState({oneFlight: data[0]}, function() {
         this.props.history.push('/details')})  
        )
        .catch(function(e){
            alert("Something went wrong fetching from the API, please try again.")
            this.setState({oneFlight: e})
        })
    }
    
    componentDidMount(){
        fetch(`http://localhost:3000/users/1`)
        .then(resp => resp.json())
        .then(data => this.setState({
            currentFlight: data.flights[data.flights.length-1], 
            flightNum: data.flights[data.flights.length-1].flightt.iataNumber,
            lastElementId: data.flights.length
        }))
        this.keepFetching()
        }

    keepFetching=()=>{
        const inter = setInterval(() => {
        fetch(`http://aviation-edge.com/v2/public/timetable?key=d3c2ac-8b1b5c&flight_iata=${this.state.flightNum}`)
        .then(resp => resp.json())
        .then(data => {  console.log(data[0]);
            if (data[0].status !== this.state.currentFlight.status && data[0].status !== "landed" ) {
                console.log("heeeeeyyyy");
                // this.fetchAndSend(data)
                // clearInterval(inter)
            } else if (data[0].status === "landed" ) {
                console.log("YEEEEEES ITS WORKING PERFECLTY");
                this.fetchAndSend(data)
                clearInterval(inter)
            }})
       
        }, 9000);
        // clearInterval(inter)
        // clearInterval(inter)

    }

    fetchAndSend=(data)=>{
        fetch(`http://localhost:3000/flights/${this.state.lastElementId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify({
                status: data[0].status
            })})
        .then(resp => resp.json())
        .then(data=> console.log("responds after update ", data))
        .catch(function(error) {
            alert("WE did not find this flight Number, Sorry");
            console.log(error.message);
            })
     }

    hadnlephoneNumberFromSearch=(phone, obj)=>{
        this.setState({phoneNumberFromSearch: phone, singleFlightObj: obj,flightNum: obj.flight.iataNumber })
    }

    render(){
    return (
        <div>
        <Switch>
             <Route path="/search" render={ () => <TestAuto handleAirPortNumberSubmite={this.handleAirPortNumberSubmite} handleSearchByFlightNum={this.handleSearchByFlightNum}/> } />
             <Route path="/flights"  render={()=> <FlightList flightsData={this.state.flightsData} arrival={this.state.arrival} handleOneFlight={this.handleOneFlight}/>}/>
             <Route path="/details" render={() => <FlightNum oneFlight={this.state.oneFlight} flightInfo={this.state.flightInfo} hadnlephoneNumberFromSearch={this.hadnlephoneNumberFromSearch}/>} />
        </Switch>
        </div>
    )
    }
}

export default SearchPage