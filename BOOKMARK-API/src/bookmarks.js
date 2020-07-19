import $ from 'jquery';
import store from './store';
import api from './api';

/*
const generateStars = function (numStars) {
  switch (numStars) {
    case 1:
      return '★☆☆☆☆';
    case 2:
      return '★★☆☆☆';
    case 3:
      return '★★★☆☆';
    case 4:
      return '★★★★☆';
    case 5:
      return '★★★★★';
    default:
      return 'Error, star not in range';
  }
}

const generateBookmarkItem = function (bookmark) {
  return $(`
    <li class="item" id=${item.id}>
      <div class="group">
        <h3 class="inline-block item">${item=.title}</h3>
        <p class="inline-block item">${generateStars(item.rating)}</p>
        <div class="hiddennnn group">
          <a href=${bookmark.url}>Visit Site</a>
          <p>${bookmark.desc}</p>
          <button type="submit" class="remove">Remove</button>
        </div>
      </div>
    </li>
  `);
}

// EVENT HANDLER FUNCTIONS

const handleFilter = function () {
  $('header').on('click', '.filter', function(evt) {
    evt.preventDefault();
    $('header.add-area').toggleClass("hidden");
  })
}

const handleAddNewBookmark = function () {
  $('header').on('click', '.add-new', function(evt) {
   
*/

/*const generateStars = function (numStars) {
    switch (numStars) {
      case 1:
        return '★☆☆☆☆';
      case 2:
        return '★★☆☆☆';
      case 3:
        return '★★★☆☆';
      case 4:
        return '★★★★☆';
      case 5:
        return '★★★★★';
      default:
        return 'Error, star not in range';
    }
};*/



const generateItemElement = function (item) { //item is the definition of the current object and all
    let itemTitle = `<span class="bookmark bookmark_filtered">${item.title}${item.rating}</span>`; //affects filtered items

    //REMEMBER TO ADD DELETE FUNCTION AND ICON
    return `
        <li class="js-bookmark" data-item-id="${item.id}">
            <button type='button' class="js-bookmarkHead">
                ${itemTitle}
            </button>
            <div id="js-bookmarkInfo" class="hidden" >
                <button class="js-item-delete">Delete</button>
           
            
                <button class="visit">
                    <a href="${item.url}"target=blank>Visit</a>
                </button>
                <div class="description">
                    ${item.desc}
                </div>
            </div>
        </li>`;

};

/*const generateBookmarkItem = function (item) {
    return $(`
      <li class="js-bookmark"  data-item-id="${item.id}">
        <div class="group">
          <h3 class="inline-block item">${item.title}</h3>
          <p class="inline-block item">${generateStars(item.rating)}</p>
          <div class="hidden">
            <a href=${item.url}>Visit Site</a>
            <p>${item.desc}</p>
          </div>
        </div>
      </li>
    `);
}*/


const generateBookmarkString = function (bookmarks) {
    const items = bookmarks.map((item) => {
        return generateItemElement(item);
    });
    return items.join('');
};

const generateError = function (message) {
    return `<section class="error-content">
            <button id="cancel-error">X</button>
            <p>${message}</p>
        </section>`;
};

const renderError = function () {
    if (store.error) {
        const el = generateError(store.error);
        $('.error-container').html(el);
    } else {
        $('.error-container').empty();
    }
};

const handleCloseError = function () {
    $('.error-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    });
};

const render = function () {
    renderError();
    // Filter item list if store prop is true by item.checked === false
    let items = [...store.items];
    /*if (store.filtered) {
      items = items.filter(item => !item.checked);
    }*/

    // render the list in the DOM
    const bookmarkItemString = generateBookmarkString(items);


    // insert that HTML into the DOM
    $('#js-bookmarks').html(bookmarkItemString);
};

const newItemPage = function () {
    $('.js-new').click(() => {
    
        $('#js-newBookmark').removeClass('hidden');
        $('#js-bookmarks').addClass('hidden');
    });
};

//
const handleNewItemSubmit = function () {
    $('.js-create').click(function (event) {
        event.preventDefault();
        const newItemUrl = $('.js-newLink').val();
        const newItemName = $('.js-newName').val();
        const newItemRating = 4;
        const newItemDescription = $('.js-newDescription').val();
        const newItemContent = {
            title : newItemName,   
            url : newItemUrl,
            desc: newItemDescription,
            rating : newItemRating
        };
        $('.js-newLink').val('');
        $('.js-newName').val('');
        $('.js-newRating').val('');
        $('.js-newDescription').val('');
        $('#js-bookmarks').removeClass('hidden');
   
        api.createItem(newItemContent) //ROOM FOR ERROR
            .then((newItem) => {
                store.addItem(newItem);
                render();

                
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.js-bookmark')
        .data('item-id');
};

const handleDeleteItemClicked = function () {
    $('#js-bookmarks').on('click', '.js-item-delete', event => {
        const id = getItemIdFromElement(event.currentTarget);

        api.deleteItem(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};


const handleToggleExpandClick = function () {
    $('#bookmarkHead').click(() => {
            $('#js-bookmarkInfo').removeClass('hidden');
            render();
        });

};



const bindEventListeners = function () {
    newItemPage();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleToggleExpandClick();
    handleCloseError();
};
export default {
    render,
    bindEventListeners
};
//todo//
//make a fuction that matches user filter input to bookmarks ratings and hides the rest