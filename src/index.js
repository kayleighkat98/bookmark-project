import $ from 'jquery';
import api from './api';
import './index.css';
import store from './store';
import bookmarks from './App';
import templates from './templates';





const main = function () {
  $('body').html(templates.htmlBones);
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