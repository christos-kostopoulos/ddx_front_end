import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchItems,fetchItem } from '../actions/itemsActions'
import SimpleTable  from './DataTable'
class Items extends Component { 

    constructor(props){
        super(props);

    this.goToItem = this.goToItem.bind(this)
    }

    componentWillMount() { 
        this.props.fetchItems();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newItem){
            this.props.items.unshift(nextProps.newItem);
        }
    }

    goToItem(name){
        console.log(name)
        this.props.fetchItem(name)
        
    }
    
    render(){
        const items = this.props.items
        return(
            <div>
                <SimpleTable 
                data={items}
                onRowClick={this.goToItem}
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    items:state.items.items,
    newItem:state.items.item, 
    item:state.items.item
})
export default connect(mapStateToProps,{fetchItems, fetchItem})(Items);