import React from 'react'
import '../CssFolder/TestAuto.css'       
import {airports} from './list'
import Button from 'react-bootstrap/Button';
// import '../CssFolder/SearchStyle.scss'

class TestAuto extends React.Component {
    constructor(props) {
      super(props);
      this.items = airports
      
      this.state = {
        suggestions: [],
        text: '',
        checkboxArrivale: false,
        checkboxDeparture: false,
        arrival: null,
        departure: null,
        flightNumber: null
      }
    }
    
  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({suggestions, text: value}));
  }
  
  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }
  
  renderSuggestions() {
    const {suggestions} = this.state;
    if(suggestions.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <ul>
          {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
        </ul>
      </div>
    );
  }

  handleInputChange1=(ar)=>{
    this.setState({
      checkboxDeparture: false,
      checkboxArrivale: true,
      departure: ar.target.name
    })
  }


  handleInputChange2=(ar)=>{
    this.setState({
      checkboxDeparture: true,
      checkboxArrivale: false,
      departure: ar.target.name
    })
  }
  
  handleFlightNumChange=(arg)=> {
    this.setState({
      flightNumber: arg.target.value
    })
  }

  
    render() {
      const { text } = this.state;
      return (
        <>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="search col-md-12 input">
              <input id="input" value={text} onChange={this.onTextChanged} 
              type="text" placeholder="Search by Airport name" 
              style={{marginTop: '20%', marginLeft: "20%"}}
              />
            </div>

                {this.renderSuggestions()}
                <input
                className="css-checkbox "
                id="first-checkbox"
                name="arrival"
                type="checkbox"
                checked={this.state.checkboxArrivale}
                onChange={this.handleInputChange1} />
                <label className="css-label m-4 " for="first-checkbox">
                  Arrival 
                </label>

                <input id="second-checkbox"
                  className="css-checkbox "
                  name="departure"
                  type="checkbox"
                  checked={this.state.checkboxDeparture}
                  onChange={this.handleInputChange2} />
                  <label className="css-label m-4" for="second-checkbox">
                  Departure 
                </label>

          </div>
            <Button className ="btn1" variant="outline-warning" lg="lg" tybe="submit" onClick={() => this.props.handleAirPortNumberSubmite(this.state.text, this.state.arrival, this.state.departure )}>Search</Button>
        </div>
        <div className="second-ipt">
            <input   value={this.state.flightNumber} onChange={this.handleFlightNumChange} type="text" placeholder="Search by Flight Number" />
            <Button  className ="btn2" variant="outline-warning"  tybe="submit" 
            onClick={()=> this.props.handleSearchByFlightNum(this.state.flightNumber)}
            >Search</Button>
        </div>
        </>
      );
    }
  }
          
export default TestAuto