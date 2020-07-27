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



const generateItemElement = function (item) { //item is the definition of the current object and all
  console.log(item.id);
  
    return `
        <li class="js-bookmark"  data-item-id="${item.id}">
         
            <div class='bookmarkStarter'>
                <h3 class="js-bookmarkHead">${item.title}</h3> 
                <p>${generateStars(item.rating)}</p>
            </div>

            <div class='js-bookmarkDrop' class='hidden'>
                <p>Bookmark Description:</p>
                <p>${item.desc}</p>
                <button><a href=${item.url} target="_blank" >Visit Site</a></button>
                <button class="js-item-delete">Delete</button> 
            </div>
        </li>
    `;
    
};
/*click plans
1
filter ul bookmarks li
if li === li clicked
toggle bookmarkDrop class ('hidden')
2
when clicking


*/



$("ul.js-bookmarks").click((event) =>{
// console.log($("ul.js-bookmarks"));
// console.log(event.target.getAttribute('data-item-id'));
// console.log(event.target.getAttribute(".js-bookmarkDrop"));
let bookmarks = $(' ul.js-bookmarks').children(".js-bookmark");
let bookmark = bookmarks.children(".js-bookmarkDrop");
console.log('kid',bookmark);
bookmark.toggleClass( 'hidden' );
// event.target.getAttribute('data-item-id').find( ".js-bookmarkDrop" )
    
});


  // $("ul").click((event) =>{
  //   // console.log($("ul.js-bookmarks"));
  //   // console.log(event.target.getAttribute('data-item-id'));
  //   // console.log(event.target.getAttribute(".js-bookmarkDrop"));
  // console.log('demo');
  // const kids = $( event.target ).children('.js-bookmarkDrop');

  //   kids.toggleClass( 'hidden' );
  // // event.target.getAttribute('data-item-id').find( ".js-bookmarkDrop" )

  // });


const generateBookmarkString = function (bookmarks) {
    const items = bookmarks.map((item) => {
      
//rather than returning what i have i could/should append it to the page with an event listener
        return generateItemElement(item);//attatch click listener here?
    });
    return items.join('');
};






// const showInfo = function () {
//     $('.bookmarkStarter').click(()=> {
//         $( ".js-bookmarkDrop" ).show();
//         console.log('pie');
//     });
    
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
    $('.js-bookmarks').html(bookmarkItemString);
};

const newItemPage = function () {
    $('.js-new').click(() => {
    
        $('#js-newBookmark').removeClass('hidden');
        $('.js-bookmarks').addClass('hidden');
    });
};



const handleNewItemSubmit = function () {
    $('.js-create').click(function (event) {
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


// $($(this).data("id"))

// $("ul[data-item-id=item-id]")

// $(ul["data-item-id"="item-id"])

// ul[data-item-id=item-id]

// [attribute = value] { css declarations; }


// $('ul.js-bookmarks ').on("click","js-bookmark",function() {
//     $(this).find(".js-bookmarkDrop").toggleClass( 'hidden' );
// });
// $('.js-bookmarkDrop').click(function(event) {
//     alert(event.currentTarget.getElementsByTagName('li')[0].className);
//     $( ".js-bookmarkDrop" ).toggleClass( 'hidden' );
// });

// $('.js-bookmark-drop ').click(function(event) {
//     //alert(event.currentTarget.List)
//    // $(this).toggleClass( 'hidden' );
//    console.log(cat)
// });

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

//const handleDropItem = function (){

  //}

const bindEventListeners = function () {
    newItemPage();
    // showInfo();
    // handleDropItem();
  
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleCloseError();

};
export default {
    render,
    bindEventListeners
};
//todo//
//make a fuction that matches user filter input to bookmarks ratings and hides the rest