const items = [];
let error = null;
let filterItem = false;
//finds targeted item in the server
const findById = function (id) {
    return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
    this.items.push(item);
};

/*const findAndUpdate = function (id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
};*/

const findAndDelete = function (id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const unHide = function (){
    this.removeClass("hidden");
};
const hide = function (){
    this.addClass("hidden");
};


/*const toggleFilter = function () {
    this.filterItem = !this.filterItem;
};*/

const setError = function (error) {
    this.error = error;
};

export default {
    items,
    error,
    unHide,
    hide,
    findById,
    addItem,
    findAndDelete,
    setError
};