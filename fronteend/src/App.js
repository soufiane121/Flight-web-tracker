import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import SearchPage from './Container/SearchPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginSingUp from "./Container/LoginSignuo"



class App extends React.Component {
  state={
    currentUser: null,
    fullerrors: [],
    passOrUser: false
  }
  
  handleLogin =(arg)=>{
    arg.preventDefault()
    arg.persist()
    console.log("appppp login", arg.target.elements.user_name.value);
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_name: arg.target.elements.user_name.value,
        password_digest: arg.target.elements.password_digest.value
      }) })
      .then(resp => resp.json())
      .then(data => {
        if (data.hasOwnProperty("error")) {
          this.setState({passOrUser: true})
        } else {
          this.setState({passOrUser: false})
          localStorage.user_id = data.user.id 
          this.props.history.push("/search")
        }
      }
      )
  }

  handleSignUp =(arg)=>{
    arg.preventDefault()
    arg.persist()
    console.log("appppp sign", arg.target.elements.user_name.value);
    fetch(`http://localhost:3000/users`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_name: arg.target.elements.user_name.value,
        first_name: arg.target.elements.first_name.value,
        last_name: arg.target.elements.last_name.value,
        password_digest: arg.target.elements.password_digest.value
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.hasOwnProperty("error")) {
        this.setState({fullerrors: data.error})
      } else {
        this.setState({currentUser: data.user.user_name})
        localStorage.user_id= data.user.id
        this.props.history.push("/search")
      }
    })
  }
  
  
  render(){
    return(
      <Switch>
        <Route exact path="/" render={(routerProps) => 
        <LoginSingUp  {...routerProps} 
        handleLogin={this.handleLogin} 
        handleSignUp={this.handleSignUp}
        fullerrors={this.state.fullerrors}
        passOrUser={this.state.passOrUser}
        /> 
        }/>
        <Route  path="/" render={(routerProps) => <SearchPage {...routerProps}/> } />
      </Switch>
    )
  }
}

export default App;
