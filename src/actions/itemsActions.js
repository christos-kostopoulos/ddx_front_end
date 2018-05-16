import { FETCH_ITEMS, NEW_ITEM, FETCH_TAGS, FETCH_ITEM, DELETE_ITEM, UPDATE_ITEM } from './types';

export const fetchItems = () => (dispatch) => {
  fetch('http://localhost:5000/items')
    // fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => dispatch({
      type: FETCH_ITEMS,
      payload: data
    }));
}


export const newItem = (itemData, param) => (dispatch) => {
  console.log(param, 'new item')
  fetch('http://localhost:5000/item/' + param, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: NEW_ITEM,
        payload: item
      })
    );
}

export const fetchTags = () => (dispatch) => {
  fetch('http://localhost:5000/tags')
    // fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json(
      console.log(res.json)
    ))
    .then(data => dispatch({
      type: FETCH_TAGS,
      payload: data
    }));
}

export const fetchItem = (id) => (dispatch) => {
  fetch('http://localhost:5000/item/' + id, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: FETCH_ITEM,
        payload: data

      })
    });

}

export const deleteItem = (id)=> (dispatch) => { 
  fetch('http://localhost:5000/item/' + id, { 
    method: 'DELETE', 
    headers: { 
      'content-type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {
    dispatch({
      type:DELETE_ITEM,
      payload: data
    })
  })
}

export const updateItem = (itemData,id)=>(dispatch)=> { 
  fetch('http://localhost:5000/item/' + id, { 
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: UPDATE_ITEM,
        payload: item
      })
    );
}