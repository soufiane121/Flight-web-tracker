import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchPage from './Container/SearchPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginSingUp from "./Container/LoginSignuo"
import NavBar from './Container/NavBare'


class App extends React.Component {
  state={
    currentUser: null,
    fullerrors: [],
    passOrUser: false
  }


  componentDidMount=()=>{
    if (localStorage.user_id) {
      fetch(`http://localhost:3000/auto_login`,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.user_id
        }
      })
      .then(resp=> resp.json())
      .then(data => {console.log("before didmount",data);
       this.setState({currentUser: data.user.user_name}, function() {
        this.props.history.push("/search")
      }) })
        
    }
  }
  
  handleLogin =(arg)=>{
    arg.preventDefault()
    arg.persist()
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // 'Authorization': localStorage.user_id
      },
      body: JSON.stringify({
        user_name: arg.target.elements.user_name.value,
        password_digest: arg.target.elements.password_digest.value
      }) })
      .then(resp => resp.json())
      .then(data => 
          {
            if (data.hasOwnProperty("error")) {
              this.setState({passOrUser: true})
            } else {
              this.setState({currentUser: data.user.user_name, passOrUser: false})
              localStorage.user_id = data.user.id 
              this.props.history.push("/search")
            }
          } 
      )
  }

  handleSignUp =(arg)=>{
    arg.preventDefault()
    arg.persist()
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
  handleLogOut=()=>{
    this.setState({currentUser: null})
    localStorage.removeItem("user_id")
    this.props.history.push("/")
  }
  
  
  render(){
    console.log("from the app", this.state.currentUser);
    
    return(
      <>
      <NavBar currentUser={this.state.currentUser} handleLogOut={this.handleLogOut}/>
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
      </>
    )
  }
}

export default App;
