import React, {useState} from 'react'
import '../CssFolder/Login.css'
import Button from 'react-bootstrap/Button'


const Login =(props)=>{

  const [userNameInp, setuserNameInp] = useState("")
  const [passwordIpt, setpasswordIpt] = useState("")
  
  const handleChange=(arg)=>{
   if (arg.target.name === "user_name") {
    setuserNameInp(arg.target.value)
   } else if (arg.target.name === "password_digest") {
    setpasswordIpt(arg.target.value)
   }
  }

  return(
    <div className="everything">
      <div className="header">Login</div>
      <form onSubmit={props.handleLogin}>
        <input name="user_name" className="iptt" type="text" placeholder="User Name *" value={userNameInp} onChange={handleChange}/><br/>
        <input  name="password_digest" className="iptt" type="password" placeholder="Password *" value={passwordIpt} onChange={handleChange} /> <br/>
        <Button className="btnn" variant="outline-warning" type="submit" >LOGIN </Button>
        <p>You don not have an accout?<span onClick={props.handleDisplay}> Create ONE</span></p>
      </form>
      {props.passOrUser && <span className="errors">Password OR UserName is wrong</span>}
    </div>
  )
}

export default Login