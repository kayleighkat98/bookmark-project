import $ from 'jquery';
import api from './api';
import './index.css';
import store from './store';

const main = function () {
    api.getMarks()
      .then((items) => {
        items.forEach((item) => store.addItem(item));
        shoppingList.render();
      });
   
    shoppingList.bindEventListeners();
    shoppingList.render();
  };
  
  $(main);