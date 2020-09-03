import store from './store';
    function error(message) {
        return `
        
        <div class="error-content">
            <button id="cancel-error">X</button>
            <p>${message}</p>
        </div>`;
    } 
    function htmlBones(){
        return `
        <div class='container'>
            <main role='main'>
                <h1>Welcome to your bookshelf!</h1>

                <div class='bookmark-controls'>
                    <button type="button" id='new-bookmark' class="button js-new">+ New Bookmark</button>
                    
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
            
                
                <div class='js-error-message hidden'></div>
                <section role='region'>
                    <form id='js-form' class='hidden'></form>
                    <div class='js-no-bookmarks-intro'></div>
                    <ul class='js-bookmark-list'></ul>
                </section>
            </main>
        </div>
        `
    }
    function emptyBookShelf() {
        return `
            <p>No bookmarks to show...</p>
        `
    }
    function form() {
        return `
        <br>

        
        <ul class ='flex-outer'>
  

            <li class='form-field new-bookmark '>
                <label for="js-newName" >Title:</label>
                <input type="text" name='title' class="js-newName" placeholder="Name">
            </li>

            <li class='form-field new-bookmark '>
                <label for="js-newLink">Url: </label>
                <input type="text" name='url' class="js-newLink" placeholder="Address">
            </li>

            <li class='form-field description new-bookmark '>
                <label for="js-newDescription">Description:</label>
                <input type="text" name='desc' class="js-newDescription" placeholder="Description">
            </li>

            <li><fieldset class='form-field'>
                <p>Rating:</p>
                    <ul class='flex-inner'>
                        <li><label> <input type="radio" name="rating" value="1"> 1 </label></li>
                        <li><label> <input type="radio" name="rating" value="2"> 2 </label></li>
                        <li><label> <input type="radio" name="rating" value="3"> 3 </label></li>
                        <li><label> <input type="radio" name="rating" value="4"> 4 </label></li>
                        <li><label> <input type="radio" name="rating" value="5"> 5 </label></li>
                    </ul>
            </fieldset></li>
            <section class='flex-buttons'>
            <button type="submit" class='flex-button' value="create">Create</button>
            <button type="reset" class='flex-button' id='close-form' value="cancel">Close</button>
        </section>
        

        </ul>
        `;
    }
    function editForm(bookmark){
        return `
        <li class='edit-bookmark' data-id='${bookmark.id}'>
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
                
                <span class='edit-bookmark'><button>cancel</button></span>
              </div>
              <button type='submit' class='button small'>Update</button>
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
            <li class='bookmark collapsed-bookmark' data-id='${bookmark.id}'>
                <div class='header'>
                    <h3 class='bookmark-title' >${bookmark.title}</h3>
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
                    
                    <div>
                        <p>${bookmark.desc ? bookmark.desc : 'No Description'}</p>
                    </div>
                    <div >
                        <button><a href=${bookmark.url} target="_blank" >Visit Site</a></button>

 
                        <button class='edit-bookmark-btn' >Edit</button >

                        <button class="js-item-delete">Delete</button> 
                    </div>
                        

            </li>
        `;
    }

    export default {
        htmlBones,
        emptyBookShelf,

        error,
        form,
        editForm,
        rating,
        bookmarkCollapsed,
        bookmarkExpanded
    };
    
