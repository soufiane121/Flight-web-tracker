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
        deleteflightId: null,
        flightEror: null,
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
        const userId = parseInt(localStorage.user_id)
        console.log("flight we gonna fetch", userId);
        
        fetch(`http://localhost:3000/users/${userId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log("users flights after fetch", data.flights)
            // byebug
            if (data.flights.length > 0) {  
            this.setState({
            currentFlight: data.flights[data.flights.length-1], 
            flightNum: data.flights[data.flights.length-1].flightt.iataNumber,
            lastElementId: data.flights.length,
        }) } } )
        this.keepFetching()
        }

    keepFetching=()=>{
        const inter = setInterval(() => {
        fetch(`http://aviation-edge.com/v2/public/timetable?key=d3c2ac-8b1b5c&flight_iata=${this.state.flightNum}`)
        .then(resp => resp.json())
        .then(data => { console.log("after update", data);
          if (!data.error) {
            if (data[0].status !== this.state.currentFlight.status && data[0].status !== "landed" ) {
                console.log("heeeeeyyyy");
                // this.fetchAndSend(data)
                clearInterval(inter)
            } else if (data[0].status === "landed" ) {
                console.log("YEEEEEES ITS WORKING PERFECLTY");
                this.fetchAndSend(data)
                clearInterval(inter)
                this.handleDeeletingFlight()
            }} else if (!this.state.currentFlight.id === undefined) {
                this.handleDeleteFlightError()
                console.log("hadi mn be3d ma makayn",this.state.currentFlight.id === undefined);
                
                
            }
         })
            .catch(function(errors) {
                alert("We did not find this flight num in API, sorry")
                console.log(errors);
            })
        }, 9000);
        // clearInterval(inter)

    }

    handleDeleteFlightError=()=>{
        // if (this.state.currentFlight !==null) {
        fetch(`http://localhost:3000/flights/${this.state.currentFlight.id}`, {
            method: 'DELETE'
        })
        .then(resp=> resp.json())
        .then(data=> console.log("after delete flight error", data) )
    // }
    }

    handleDeeletingFlight=()=> {
       fetch(`http://localhost:3000/flights/${this.state.currentFlight.id}`,{
           method: 'DELETE'
       })
       .then(resp=> resp.json())
       .then(data=> console.log("after delleting", data)
       )
       .catch(function(error) {
        //    alert("something went wrong")
           console.log(error);
           
       })
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
        .then(data=> this.setState({deleteflightId: data.id}))
        .catch(function(error) {
            alert("WE did not find this flight Number, Sorry");
            console.log(error.message);
            })
     }

    hadnlephoneNumberFromSearch=(phone, obj)=>{
        this.setState({phoneNumberFromSearch: phone, singleFlightObj: obj,flightNum: obj.flight.iataNumber })
    }

    render(){
        console.log("after render ", this.state.currentFlight.id);
        
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