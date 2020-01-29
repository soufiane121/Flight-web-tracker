import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Header from 'react-bootstrap/ModalHeader'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


 const MyVerticallyCenteredModal=(props)=>{
    const [text, setInput] = useState("");
    
    const handleChange=(event)=>{
        setInput(event.target.value)
    }

    return (  
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered  
          >
          <Modal.Header onClick={props.handlePhoneForm} closeButton>
            <h5>Enter your phone Number to recieve update about your flight</h5>
          </Modal.Header>
          <Modal.Body>
            <h5>Enter your phone number</h5>
            <form onSubmit={(e) => props.handleSendingSms(e)} > 
                <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                    <Button variant="success" type="submit" >Send</Button>
                    </InputGroup.Prepend>
                    <FormControl aria-describedby="basic-addon1" value={text} onChange={(e)=> handleChange(e)}/>
                </InputGroup>
            </form>
          </Modal.Body>
        </Modal>
      );
  }

  export default MyVerticallyCenteredModal