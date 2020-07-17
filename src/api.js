//sets the origin link where all data is stored
const BASE_URL = ' https://thinkful-list-api.herokuapp.com/kay/bookmarks';

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
      console.log(data);
    });
};

function getMarks() {
  return bookmarkApiFetch(`${BASE_URL}`);
}

function createName(name) {
  const newName = JSON.stringify({
    newName
  });
  return bookmarkApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newName
  });
}

export default {
  getMarks,
  createName,
};