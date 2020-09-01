import $ from 'jquery';
import store from './store';
import api from './api';
import templates from './templates';

$.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const obj = {};
      formData.forEach((val, name) => obj[name] = val);
      return JSON.stringify(obj);
    }
  });
//RENDER
function render(filteredList=null) {
    
    if (store.isAdding) {
        $('#js-form').html(templates.form());
        $('#js-form').show();
        // $('.js-no-bookmarks-intro').hide();
      } else {
        $('.js-list-header').html(templates.pageHeader());
        $('#js-form').html('');
        $('#js-form').hide();
      }
  
      if (!store.list.length) {
        $('.js-list-header').html('');
        $('.js-bookmark-list').html('');
        return $('.js-no-bookmarks-intro').html(templates.emptyBookShelf());
      }
  
      const bookmarks = filteredList ? filteredList : store.list;
      const bookmarkTemplate = bookmarks.map(bookmark => renderBookmarkHtml(bookmark));
  
      $('.js-no-bookmarks-intro').html('');
      $('.js-list-header').html(templates.pageHeader());
      $('.js-bookmark-list').html(bookmarkTemplate);
};

function renderError(message) {
    $('.js-error-message').html(templates.error(message));
    $('.js-error-message').show();
};

function renderBookmarkHtml (bookmark) {
    if (bookmark.isEditing) {
        return templates.editForm(bookmark);
    } else if ( bookmark.isExpanded) {
        return templates.bookmarkExpanded(bookmark);
    } else {
        return templates.bookmarkCollapsed(bookmark)
    }
};
//EVENT
function displayForm() {
    $('.container').on('click', '#new-bookmark', function() {
        store.isAdding = true;
        render();
    });
};
function closeForm() {
    $('.container').on('click', '#close-form', function() {
        store.isAdding = false;
        render();
    });
};

function submitForm() {
    $('.container').on('submit', 'form#js-form', function(e) {
        e.preventDefault();
        const data = $(e.target).serializeJson();
        api.addBookmark(data)
          .then(bookmark => {
            store.addBookmark(bookmark);
            render();
        })
          .catch(error => {
            renderError(error.message);
        });
    });
};

function toggleBookmarkView() {
    $('.js-bookmark-list').on('click', '.header', function(){
       
      const id = $(this).closest('li').data('id');
      store.toggleDrop(id);
      render();
    });
  };

  function bookmarkDelete() {
    $('.js-bookmark-list').on('click', '.js-item-delete', function() {
      const id = $(this).closest('li').data('id');
      api.deleteBookmark(id)
        .then(() => {
          store.deleteBookmark(id);
          render();
        })
        .catch(error => {
          renderError(error.message);
        });
    });
  };

  function filterByRating() {
    $('.container').on('change', '#filter-by-rating', function() {
      const rating = $(this).val();
      const filteredList = store.filterByRating(rating);
      render(filteredList);
    });
  };

  function closeError() {
    $('.container').on('click', '#close-error', function() {
        console.log('fuck');
      $('.error-content').hide();
    });
  };

  function toggleEditForm() {
    $('.js-bookmark-list').on('click', '.edit-bookmark', function() {
      const id = $(this).closest('li').data('id');
      store.toggleEdit(id);
      render();
    });
  };

  function editFormSubmit() {
    $('.js-bookmark-list').on('submit', 'form#js-edit-form', function(e){
      e.preventDefault();
      const id = $(this).closest('li').data('id');
      const data = $(e.target).serializeJson();
      api.editBookmark(id, data)
        .then(() => {
          store.editBookmark(id, data);
          render();
        })
        .catch(error => {
          renderError(error.message);
        });
    });
  };


const bindEventListeners = function () {
    displayForm();
    closeForm();
    submitForm();
    toggleBookmarkView();
    bookmarkDelete();
    filterByRating();
    closeError();
    toggleEditForm();
    editFormSubmit();
   
};
export default {
    render,
    renderError,
    bindEventListeners
};
