import $ from 'jquery';
import api from './api';
import './index.css';
import store from './STORE';
import bookmarks from './App';
//filterValue();
const updateValue = function (){
  
  $(document.body).on('change',"#js-filter", () =>  {
      store.filterValue = $("#js-filter option:selected").val(); 
      console.log( store.filterValue);
      return store.filterValue
  });

};
//console.log(updateValue.this.filterValue)
//console.log(bookmarks.updateValue)
const main = function () {


  
   // store.updateValue($(document.body));
   
    api.getMarks()
    
      .then((items) => { 
        //console.log(store.filterValue);
        //console.log(bookmarks.updateValue(items))
       //console.log(bookmarks.filterValue);
       // console.log(items);
        items.forEach((item) => (
          //console.log(item),

          //console.log('api item', item.rating),
          store.addItem(item)
        ));
        bookmarks.render(); 
         updateValue( );
      });
    bookmarks.bindEventListeners();
    bookmarks.render();
    
  };
  
  $(main);