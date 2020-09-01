import $ from 'jquery';
import api from './api';
import './index.css';
import store from './store';
import bookmarks from './App';





const main = function () {
  api.getBookmarks()
    
  .then((list) => {
    store.list = list;
    bookmarks.render();
  })
  .catch(error => {
    bookmarks.renderError(error.message);
  });

  bookmarks.bindEventListeners(); 
};
  
$(main)