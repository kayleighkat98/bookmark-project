import $ from 'jquery';
import store from './STORE';
import api from './api';



///
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
};

//console.log(document.getElementById("js-filter").value)
///

// const filterValue = function (item){
// $(document.body).on('change',"#js-filter",function () {
//     //doStuff
//     item = $("#js-filter option:selected").val();
// const filterValue = 
// });
// console.log('ass', filterValue);
// }
// let filterValue = 0;
// function updateValue (item){
//     item = $(document.body);
//     item.on('change',"#js-filter", () =>  {
//         item = $("#js-filter option:selected").val(); 
//     });
//     filterValue= item
//     console.log(filterValue)
// }



const generateItemElement = function (item) { //item is the definition of the current object and all

    return `
      <li class='js-bookmark'data-item-id="${item.id}" >
        <button class='bookmark' 'data-item-id="${item.id} >
                <h3 class="js-bookmarkHead">${item.title}</h3> 
                <p>${generateStars(item.rating)}</p>
           
        </button>
            <div class='js-bookmarkDrop' id='${item.id}'>
                <p>Bookmark Description:</p>
                <p>${item.desc}</p>
                <button><a href=${item.url} target="_blank" >Visit Site</a></button>
                <button class="js-item-delete">Delete</button> 
            </div>
        
      </li>
      </br>
    `
  ;
    
};


const generateBookmarkString = function (bookmarks) {
    const items = bookmarks.map((item) => {
        return generateItemElement(item);
    });
    return items.join('');
};

// const generateBookmarkData = function (bookmarks) {
//     const itemData = bookmarks.map((item,i) => {
//         return (Object.values(item))
//     });

// };
// const updateValue = function (item){
//     item = $(document.body);
//     item.on('change',"#js-filter", () =>  {
//         store.filterValue = $("#js-filter option:selected").val(); 
//         //console.log( store.filterValue);
//         return store.filterValue
//     });
//     ;

  
// };


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
//
const render = function () {
    renderError();
 
    let items = [...store.items];
    const bookmarkItemString = generateBookmarkString(items);
    //const itemData = generateBookmarkData(items);
    $('.js-bookmarks').html(bookmarkItemString);
    //console.log(items)
};

$('ul.js-bookmarks').on('click', '.js-bookmark', event => {
    const id = $(event.currentTarget).children('.js-bookmarkDrop');
    id.toggleClass('hidden');    
    });

const AddNewItemForm = function (){
    $('.js-new').click(() => {
    
        $('#js-newBookmark').removeClass('hidden');
        $('.js-bookmarks').addClass('hidden');
    });

  
};
const removeNewItemPage = function (){
    $('#cancelNewBookmark').click(() => {
    
        $('#js-newBookmark').addClass('hidden');
        $('.js-bookmarks').removeClass('hidden');
    });

  
};



const handleNewItemSubmit = function () {
    $('.createNewBookmark').click(function (event) {
        event.preventDefault();
        const newItemUrl = $('.js-newLink').val();
        const newItemName = $('.js-newName').val();
        const newItemRating = $('.js-newRating').val();
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
        $('.js-bookmarks').removeClass('hidden');
   
        api.createItem(newItemContent)
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
    $('ul.js-bookmarks').on('click', '.js-item-delete', event => {
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
// console.log(store.items[0].rating);
// const ratings = function( ){
//     let ratings = []
 
//     store.items.map((item,i)=>(
//        ratings.push((item[i].rating))
//     //    console.log
//     ))
//     console.log([...ratings]) ;
// };
// ratings()
const bindEventListeners = function () {
    //updateValue();
    removeNewItemPage();
    AddNewItemForm();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleCloseError();
    
};
export default {
    //filterValue,
    render,

    bindEventListeners,
    
};
