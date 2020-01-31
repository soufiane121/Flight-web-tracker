import React, {useState} from 'react'
import '../CssFolder/SignUp.css'
import Button from 'react-bootstrap/Button'
// import ModalErros from './ModalErros'


const SignUp =(props)=>{
  const [userName, setUserName] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [password, setPassword] = useState('')

  const handlechange =(e)=>{
    e.persist()
    const names = e.target.name 
    const values = e.target.value
     if (names === "user_name") {
      setUserName(values)
     } else if (names === "first_name") {
      setfirstName(values)
     } else if (names === "last_name") {
      setlastName(values)
     } else if (names === "password_digest") {
      setPassword(values)
     }
  }

  return(
    <>
    <div className="second">
      <div className="header">SignUp</div>
      <form onSubmit={props.handleSignUp}>
        <input name="user_name" className="iptt" type="text" placeholder="User Name *"  value={userName} onChange={handlechange}/><br/>
        <input name="first_name" className="iptt" type="text" placeholder="First Name *" value={firstName} onChange={handlechange}/><br/>
        <input name="last_name" className="iptt" type="text" placeholder="Last Name *" value={lastName} onChange={handlechange}/><br/>
        <input name="password_digest" className="iptt" type="password" placeholder="Password *" value={password} onChange={handlechange}/> <br/>
        <Button className="btnn" variant="outline-warning" type="submit">SignUp </Button>
        <p>You have an account?<span onClick={props.handleDisplay}>  Login</span></p>
      </form>
      {props.fullerrors &&  props.fullerrors.map(error => <li>{error}</li>)}
    </div>
    </>
  )
}

export default SignUp