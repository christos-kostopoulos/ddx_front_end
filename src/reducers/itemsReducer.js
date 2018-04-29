import { FETCH_ITEMS,NEW_ITEM, FETCH_TAGS, FETCH_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = { 
    items:[],
    tags: [],
    item: {},
}

export default function(state = initialState, action) { 
    switch(action.type) { 
        case FETCH_ITEMS:
        return {
            ...state,
            items:action.payload.items,
        }
        case NEW_ITEM:
        return {
            ...state,
            item: action.payload
        }
        case FETCH_TAGS:
        return {
            ...state,
            tags:action.payload
        }
        case FETCH_ITEM:
        return { 
            ...state,
            item:action.payload
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