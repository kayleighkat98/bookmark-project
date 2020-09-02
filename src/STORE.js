
const list= [];
let error = null;
let minimumRating= 0;
let addingBookmark = false ;
let filterBy = '';


// ADD & DELETE & PATCH methods
function addBookmark(bookmark) {
    this.list.push(bookmark);
    this.addingBookmark = false;
};
function deleteBookmark (target_id) {
    this.list= this.list.filter(bookmark => bookmark.id !== target_id);
};
function editBookmark (id, data){
    data = JSON.parse(data);
    const bookmark = this.findById(id);
    bookmark.isEditing = false;
    bookmark.isExpanded = true;
    Object.keys(data).forEach(key => {
        bookmark[key] = (key === 'rating') ? Number(data[key]) : data[key];
    });
};

// VIEW & FILTER toggles & methods
function findById(id) {
    return this.list.find(bookmark => bookmark.id === id);
};

function toggleDrop(id){
    const bookmark = this.findById(id);
    bookmark.isExpanded = !bookmark.isExpanded;
    
};

function toggleEdit(id) {
    const bookmark = this.findById(id);
        bookmark.isEditing = !bookmark.isEditing;
}
// function toggleError(){

// }

function filterByRating(rating) {
    this.filterBy = Number(rating);

    if (rating) {
        return this.list.filter(bookmark => bookmark.rating >= this.filterBy)
    }

    return this.list
}


export default {

    list,
    addingBookmark,
    filterBy,
    addBookmark,
    toggleDrop,
    toggleEdit,
    findById,
    deleteBookmark,
    filterByRating,
    editBookmark,
    error,
    minimumRating,

};