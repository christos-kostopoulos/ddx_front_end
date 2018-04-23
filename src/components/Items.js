import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../actions/itemsActions'

class Items extends Component { 

    componentWillMount() { 
        this.props.fetchItems();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newItem){
            this.props.items.unshift(nextProps.newItem);
        }
    }

    render(){
        console.log(this.props)
        const items = this.props.items.map(item => (
            <div key={item.name}>
                <h3>{item.name}</h3>
            </div>
        )) 
        return(
            <div>
                Items
               {items}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    items:state.items.items,
    newItem:state.items.item 
})
export default connect(mapStateToProps,{fetchItems})(Items);