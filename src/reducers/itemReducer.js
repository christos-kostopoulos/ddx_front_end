
import { FETCH_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = { 
    item: {},
    tags:[]
}

export default function(state = initialState, action) { 
    switch(action.type) { 
        case FETCH_ITEM:
        console.log(action.payload)
        return { 
            ...state,
            item:action.payload[0].item,
            tags:action.payload[1].tags

        }
        case DELETE_ITEM:
        return { 
            ...state,
            item:action.payload
        }
        default: 
            return state;
    }
}