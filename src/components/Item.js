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
            currentTags:[]
        }

        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillMount(){ 
        let id = parseInt(this.props.match.params.id)
        this.props.fetchItem(id)
      
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        this.setState({
            currentItem:nextProps.item.item,
            currentTags:nextProps.tags.tags
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
        // console.log(this.state.currentItem, currentTags)
        
        return(
            <div>
               <ItemDetail
               currentItem = {currentItem}
               currentTags = {currentTags}
               handleDeleteButton = { this.deleteItem }
               />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        item: state.items.item[0],
        tags:state.items.item[1]
    }
}


export default connect(mapStateToProps,{fetchItem,deleteItem })(Item)