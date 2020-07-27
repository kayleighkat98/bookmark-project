import $ from 'jquery';
import api from './api';
import './index.css';
import store from './store';
import bookmarks from './bookmarks';

const main = function () {
    api.getMarks()
      .then((items) => {
        items.forEach((item) => store.addItem(item));
        bookmarks.render();
        
      });
    bookmarks.bindEventListeners();
    bookmarks.render();
  };
  
  $(main);