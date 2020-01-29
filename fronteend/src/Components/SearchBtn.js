import React from 'react'
import Button from 'react-bootstrap/Button';

class SearchBtn  extends React.Component {

     handPush =()=> {
        this.props.history.push("/search")
    }
    render(){
        return (
            <Button onClick={this.handPush}>
                Heeeelo
            </Button>
        )
    }
}

export default SearchBtn