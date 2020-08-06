import $ from 'jquery';
import store from './STORE';
import api from './api';

const generateError = function (message) {
    return `
        <section class="error-content">
            <button id="cancel-error">X</button>
            <p>${message}</p>
        </section>`;
};



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

const generateItemElement = function (bookmark) { 
    return `
      <li class='js-bookmark'data-item-id="${bookmark.id}" >
        <button class='bookmark' 'data-item-id="${bookmark.id} >
                <h3 class="js-bookmarkHead">${bookmark.title}</h3> 
                <p>${generateStars(bookmark.rating)}</p>
           
        </button>
            <div class='bookmarkContents hidden' id='${bookmark.id}'>
                <h4>Description:</h4>
                <p>${bookmark.desc}</p>
                <button><a href=${bookmark.url} target="_blank" >Visit Site</a></button>
                <button class="js-item-delete">Delete</button> 
            </div>
        
      </li>
    `
    ;
    
};




const generateBookmarkString = function (bookmarks) {
    const items = bookmarks.map((item) =>    
        generateItemElement(item)
    );
    return items.join('');
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
    let bookmarks = [...store.items].filter(bookmark=>{
        return bookmark.rating >= store.minimumRating
    });
    $('.bookmarkList').html(generateBookmarkString(bookmarks));
};

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.js-bookmark')
        .data('item-id');
};
const handleNewBookmarkSubmit = function () {
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
            rating : newItemRating,
        };
        $('.js-newLink').val('');
        $('.js-newName').val('');
        $('.js-newRating').val('');
        $('.js-newDescription').val('');
        $('.bookmarkList').removeClass('hidden');
   
        api.createItem(newItemContent)//use function that calls updated search
            .then((newItem) => {// then with the serch value 
                store.addItem(newItem);//call the items.map function
                render();
                
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};

const handleDeleteItemClicked = function () {
    $('ul.bookmarkList').on('click', '.js-item-delete', event => {
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
function handleMinimumRatingFilter(){
    $('#filter').on('change', event => {
      let rating = $(event.target).val();
      store.minimumRating = rating;
      render();
    });
}



$('ul.bookmarkList').on('click', '.js-bookmark', event => {
    const id = $(event.currentTarget).children('.bookmarkContents');
    id.toggleClass('hidden');    
    });

const AddNewItemForm = function (){
    $('.js-new').click(() => {
    
        $('#js-newBookmark').removeClass('hidden');
        $('.bookmarkList').addClass('hidden');
    });

  
};
const removeNewItemPage = function (){
    $('#cancelNewBookmark').click(() => {
    
        $('#js-newBookmark').addClass('hidden');
        $('.bookmarkList').removeClass('hidden');
    });

  
};




//store.filterValue
const bindEventListeners = function () {
    //updateValue();
    //filterValue();
    handleMinimumRatingFilter();
    removeNewItemPage();
    AddNewItemForm();
    handleNewBookmarkSubmit();
    handleDeleteItemClicked();
    handleCloseError();
    
};
export default {
    //filterValue,
    render,
    //filterValue,
    bindEventListeners,
    
};
// const filterValue = function (item) {
//     $( "select" ).change(function () {
//         $( "select option:selected" ).each(function() {
//             filterValue = ( $( this ).val() + " ");
//         //     return filterValue
//         // })
//         // .then( (value) =>{
//         //     if (value == item.rating){
//         //         console.log('hurray!')
//         //     }
//         });
        


//         // if (filterValue< 1){
//         //     this.removeClass('hidden');
//         // } else 
//         // if (filterValue != 3){
//         //     //console.log('carrot');

//         //     this.addClass('hidden');
//         // } else 
//         // if (filterValue == 3){
//         //     //console.log('camel');
//         //     this.removeClass('hidden');
//         // } else{
//         //     console.log('FAIL');
//         // }

//     });
// };
