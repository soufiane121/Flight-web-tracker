import React from 'react';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

class LoginSingUp extends React.Component {
    state={
        display: true
    }
    
    handleDisplay =()=> {
        this.setState({
            display: !this.state.display
        })
    }

    render(){
        return(
            <>
            { this.state.display
            ?
            <Login handleDisplay={this.handleDisplay} handleLogin={this.props.handleLogin} passOrUser={this.props.passOrUser}/>
            :
            <SignUp handleDisplay={this.handleDisplay} handleSignUp={this.props.handleSignUp} fullerrors={this.props.fullerrors}/>
            }
            </>
        )
    }
}

export default LoginSingUp;