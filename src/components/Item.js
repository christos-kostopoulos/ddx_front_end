import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchItem, deleteItem } from '../actions/itemsActions'
import ItemDetail from './ItemDetail';

class Item extends React.Component{ 

    constructor(props){
        super(props)

        this.state = { 
            currentItem:{},
            currentTags:[],
            updateView: false
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentWillMount(){ 
        let id = parseInt(this.props.match.params.id)
        this.props.fetchItem(id)
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        this.setState({
            currentItem:nextProps.item.item,
            currentTags:nextProps.item.tags
        })
    }

    updateItem() { 
        this.setState({
            updateView:true
        })

    }

    deleteItem() { 
        let id = parseInt(this.props.match.params.id)
        this.props.deleteItem(id)
        console.log(id)
    }
    render(){
        const { currentTags } = this.state;
        const { currentItem } = this.state
        
        return(
            <div>
               <ItemDetail
               currentItem = {currentItem}
               currentTags = {currentTags}
               handleDeleteButton = { this.deleteItem }
               handleUpdatebutton = { this.updateItem }
               />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
       item:state.item,
       items:state.items
    }
}


export default connect(mapStateToProps,{fetchItem,deleteItem })(Item)
