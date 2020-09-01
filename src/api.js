
//api link
const BASE_URL = ' https://thinkful-list-api.herokuapp.com/kay/bookmarks/';

//grab information from api and catch any errors
const bookmarkApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = {code: res.status};
      }
      return res.json();
    })
    .then(jsonData => {
      if (error) {
        error.message = jsonData.message;
        return Promise.reject(error);
      }
      return jsonData;
    });
}

//GET
function getBookmarks() {
  return bookmarkApiFetch(`${BASE_URL}`);
}

//POST
function addBookmark(data) {

  return bookmarkApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
}

//DELETE
function deleteBookmark(id) {
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
}

//PATCH
function editBookmark(id, data){
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}

export default {
  getBookmarks,
  addBookmark,
  editBookmark,
  deleteBookmark,
};