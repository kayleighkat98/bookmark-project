import store from './store';
    function error(message) {
        return `
        
        <div class="error-content">
            <button type='reset' id="cancel-error">X</button>
            <p>${message}</p>
        </div>`;
    } 
    function emptyBookShelf() {
        return `
            <h2>Welcome to your bookshelf!</h2>
            <button type="button" id='new-bookmark' class="button js-new">+ New Bookmark</button>
            <p>No bookmarks to show...</p>
        `
    }
    function pageHeader() {
        return `
        <h1 class='head'>My (online)Bookshelf</h1>

        <div class='bookmark-controls'>

            <button class='button' id='new-bookmark'>+ New Bookmark</button>

            <label for='filter-by-rating'>Filter :</label>
            <select id='filter-by-rating'>
                <option value="" ${store.filterBy === '' ? 'selected="selected"' : ''}>All</option>
                <option value="1" ${store.filterBy === 1 ? 'selected="selected"' : ''}>1 Star</option>
                <option value="2" ${store.filterBy === 2 ? 'selected="selected"' : ''}>2 Stars</option>
                <option value="3" ${store.filterBy === 3 ? 'selected="selected"' : ''}>3 Stars</option>
                <option value="4" ${store.filterBy === 4 ? 'selected="selected"' : ''}>4 Stars</option>
                <option value="5" ${store.filterBy === 5 ? 'selected="selected"' : ''}>5 Stars</option>
            </select>

        </div>
        `;
    }
    function form() {
        return `
        <ul class ='flex-outer'>
            <li class='form-field'>
                <label for="js-newName" >Title:</label>
                <input type="text" name='title' class="js-newName" placeholder="name">
            </li>

            <li class='form-field'>
                <label for="js-newLink">Url: </label>
                <input type="text" name='url' class="js-newLink" placeholder="address">
            </li>

            <li class='form-field description'>
                <label for="js-newDescription">Description:</label>
                <input type="text" name='desc' class="js-newDescription" placeholder="Description">
            </li>

            <li><fieldset class='form-field'>
                <p>Rating</p>
                    <ul class='flex-inner'>
                        <li><label> <input type="radio" name="rating" value="1"> 1 </label></li>
                        <li><label> <input type="radio" name="rating" value="2"> 2 </label></li>
                        <li><label> <input type="radio" name="rating" value="3"> 3 </label></li>
                        <li><label> <input type="radio" name="rating" value="4"> 4 </label></li>
                        <li><label> <input type="radio" name="rating" value="5"> 5 </label></li>
                    </ul>
            </fieldset></li>

            <li class='form-controls'>
                <button type="submit" class='createNewBookmark' value="create">Create</button>
            </li>
            <li>
             <button type="reset" id='close-form' value="cancel">Cancel</button>
            </li>
        </ul>
        `;
    }
    function editForm(bookmark){
        return `
        <li class='bookmark' data-id='${bookmark.id}'>
          <div class='header'>
            <h3>${bookmark.title}</h3>
          </div>
          
          <div class='body'>
            <form id='js-edit-form'>

                <div class='rating'>
                <fieldset>
                <legend> Rating </legend>
                    <label> <input type="radio" name="rating" value="1" ${bookmark.rating === 1 ? 'checked="checked"' : ''}> 1 </label>
                    <label> <input type="radio" name="rating" value="2" ${bookmark.rating === 2 ? 'checked="checked"' : ''}> 2 </label>
                    <label> <input type="radio" name="rating" value="3" ${bookmark.rating === 3 ? 'checked="checked"' : ''}> 3 </label>
                    <label> <input type="radio" name="rating" value="4" ${bookmark.rating === 4 ? 'checked="checked"' : ''}> 4 </label>
                    <label> <input type="radio" name="rating" value="5" ${bookmark.rating === 5 ? 'checked="checked"' : ''}> 5 </label>
                </fieldset>

                <div class='description'>
                    <label style='display:block;' for='edit-bookmark-desc'>Description</label>
                    <textarea form='js-edit-form' name='desc' id='edit-bookmark-desc'>${bookmark.desc ? bookmark.desc : 'no description given'}</textarea>
                </div>
                
                <span class='edit-bookmark'><button>cancel edit</button></span>
              </div>
              <button type='submit' class='button small'>Update Bookmark</button>
            </form>
          </div>
        </li>
      `;
    }
    function rating(rating) {
        switch (rating) {
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
                return 'No Rating Provided';
        }
    };
    function bookmarkCollapsed(bookmark) {
        return `
            <li class='bookmark' data-id='${bookmark.id}'>
                <div class='header'>
                    <h3>${bookmark.title}</h3>
                </div>
                
                <div class='rating'>
                    ${bookmark.rating ? rating(bookmark.rating) : 'No Rating'}
                </div>
            </li>
        `;
        
    }
    function bookmarkExpanded(bookmark) {
        return ` 
            <li class = 'bookmark expanded-bookmark' data-id='${bookmark.id}'>
                <div class='header'>
                    <h3>${bookmark.title}</h3>
                    ${bookmark.rating ? rating(bookmark.rating) : 'No Rating'}
                </div>
                
                <div class='body'>
                    <p>
                        ${bookmark.desc ? bookmark.desc : 'No Description'}
                    </p>
                    <button><a href=${bookmark.url} target="_blank" >Visit Site</a></button>
                    <span class='edit-bookmark'> <button >Edit</button></span>
                    <button class="js-item-delete">Delete</button> 

                </div>
            </li>
        `;
    }

    export default {
        emptyBookShelf,
        pageHeader,
        error,
        form,
        editForm,
        rating,
        bookmarkCollapsed,
        bookmarkExpanded
    };
    
//     <select id="filter-by-rating">
//     <option value="0">Show All</option>
//     <option value="1">★☆☆☆☆ +</option>
//     <option value="2">★★☆☆☆ +</option>
//     <option value="3">★★★☆☆ +</option>
//     <option value="4">★★★★☆ +</option>
//     <option value="5">★★★★★ +</option>
// </select>



// <label for="js-newRating">Rating:</label>
// <select class='form-field js-newRating'>
//     <option value='1'>★☆☆☆☆ </option>
//     <option value='2'>★★☆☆☆ </option>
//     <option value='3'>★★★☆☆ </option>
//     <option value='4'>★★★★☆ </option>
//     <option value='5'>★★★★★ </option>
// </select>