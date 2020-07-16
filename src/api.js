//sets the origin link where all data is stored
const BASE_URL = ' https://thinkful-list-api.herokuapp.com/kay';

const listApiFetch = function (...args) {
  //default to error
  let error;
  //brings content of called variable to DOM
  return fetch(...args)
    //processes content
    .then(res => {
      //if the content is not readable
      if (!res.ok) {
        //define what the error is
        error = {
          code: res.status
        };
        //defines more specific error if content-type doesn't include json
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      //when no errors occure, return the json file found in the response
      return res.json();
    })
    //then with the data in the json file
    .then(data => {
      //if an error is found in the data
      if (error) {
        //the message in the error will be what the data is presenting
        error.message = data.message;
        return Promise.reject(error);
      }
      //if no errors are found in the data, return the data
      return data;
    });
};

function getMarks() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createName(name) {
  const newName = JSON.stringify({
    newName
  });
  return listApiFetch(`${BASE_URL}/bookmarks`, {
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