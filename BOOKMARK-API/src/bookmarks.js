import $ from 'jquery';
import store from './store';
import api from './api';

const generateItemElement = function (item) { //item is the definition of the current object and all
    let itemTitle = `<span class="bookmark bookmark_filtered">${item.title}${item.rating}</span>`; //affects filtered items

    //REMEMBER TO ADD DELETE FUNCTION AND ICON
    return `
        <li class="js-bookmark" data-item-id="${item.id}">
            <button type='button' id="bookmarkHead"
                ${itemTitle}
            </button>
            <div id="js-bookmarkInfo" >
                <button class="js-item-delete">
                    delete</span>
                </button>
           
            
                <button class="visit">
                    <a href="${item.url}"target=blank>Visit</a>
                </button>
                <div class="description"
                    ${item.description}
                </div>
            </div>
        </li>`;

};

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
        const newItemRating = $('.js-newRating').val();
        const newItemDescription = $('.js-newDescription').val();
        const newItemContent = {
            newItemUrl,
            newItemName,
            newItemRating,
            newItemDescription
        };
        $('.js-newLink').val('');
        $('.js-newName').val('');
        $('.js-newRating').val('');
        $('.js-newDescription').val('');
        console.log(newItemContent);
        $('#js-bookmarks').removeClass('hidden');
        api.createItem({newItemContent}) //ROOM FOR ERROR
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
                console.log(error);
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