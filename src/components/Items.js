import React, {Component} from 'react'
import { connect,dispatch } from 'react-redux'
import { fetchItems,fetchItem } from '../actions/itemsActions'
import SimpleTable  from './DataTable'
class Items extends Component { 

    constructor(props){
        super(props);

    this.goToItem = this.goToItem.bind(this)
    }

    componentWillMount() { 
        this.props.dispatchFetchItems();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newItem){
            this.props.items.unshift(nextProps.newItem);
        }
    }

    goToItem(name,id){
        console.log(id,name)
        // this.props.dispatchFetchItem(name)
    }
    
    render(){
        return(
            <div>
                <SimpleTable 
                data={this.props.items}
                onRowClick={this.goToItem}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items:state.items.items,
    newItem:state.items.item, 
})

const mapDispatchToProps = (dispatch) => {
    return {
      dispatchFetchItems: () => {
        dispatch(fetchItems())
      },
      dispatchFetchItem: (name) => { 
          dispatch(fetchItem(name))
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Items);