/* DECLARE API */


//declare base url
const BASE_URL = ' https://thinkful-list-api.herokuapp.com/kay/bookmarks/';

//create fetch statement that will also catch errors
const bookmarkApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = {
          code: res.status
        };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      //if no errors are found in the data, return the data
      return data;
    });
};

//GET
function getMarks() {
  return bookmarkApiFetch(`${BASE_URL}`);
}

//POST
function createItem(name) {
  const newItem = JSON.stringify(name);
  return bookmarkApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
}

//PATCH
function editItem(id, updateData){
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: newData
  });
}

//DELETE
function deleteItem(id) {
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
}


export default {
  getMarks,
  createItem,
  editItem,
  deleteItem,

};