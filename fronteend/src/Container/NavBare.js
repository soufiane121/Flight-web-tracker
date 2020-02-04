import React from 'react'
import {Navbar, Nav, Dropdown} from 'react-bootstrap'


  
const NavBare =(props) => {


    return(
    <Navbar bg="dark" variant="dark" sticky="top" className="ml-9 ">
        <Navbar.Brand>Flight Tracker</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link >{props.currentUser ? `Welcome ${props.currentUser}` :  " "}</Nav.Link>
        {props.currentUser ?
        <Dropdown className="mr-sm-2 cont" >
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="dropdown" >
                Log Out
            </Dropdown.Toggle>
            <Dropdown.Menu className="mr-sm-2 dropdown" >
            <Dropdown.Item onClick={props.handleLogOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        :
        ""
            }
        </Nav>
    </Navbar>
    )
}

export default NavBare;