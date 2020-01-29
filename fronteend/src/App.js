import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import SearchPage from './Container/SearchPage'
// import { Switch } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import SearchBtn from './Components/SearchBtn'


class App extends React.Component {
  
  render(){
    return(
      <Switch>
        {/* <Route  exact path="/" render={(routerProps) => <SearchBtn  />}/> */}
        <Route exact path="/login" render={(routerProps) => <div>LOGIN</div> } />
        <Route exact path="/logout" render={(routerProps) => <div>LOGOUT</div> } />
        <Route path="/" render={(routerProps) => <SearchPage {...routerProps}/> } />
        {/* <Route  path="/flights"  render={}/> */}
      </Switch>
    )
  }
}

export default App;
