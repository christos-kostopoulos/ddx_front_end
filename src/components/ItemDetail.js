import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
class ItemDetail extends React.Component{ 

    constructor(props){
        super(props)

        this.state = { 
            currentItem:{}
        }
    }

    componentWillMount(){ 
        let id = parseInt(this.props.match.params.id)
        this.setState({
            currentItem:this.props.items.items.find(item => item.id === id)
        }) 
    }

    render(){

        const { currentItem } = this.state;
        console.log(currentItem)
        return(
            <div>
                { currentItem.name }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}


export default connect(mapStateToProps)(ItemDetail)
