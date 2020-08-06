import $ from 'jquery';
const items = [];
let error = null;
let minimumRating= 0;

const addItem = function (item) {
    this.items.push(item);

};


const findAndDelete = function (id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function(id, newData){
    const bookmark = this.findById(id);
    Object.assign(bookmark, newData);
  };

const setError = function (error) {
    this.error = error;
};

export default {
    items,
    error,
    minimumRating,
    findAndUpdate,
    addItem,
    findAndDelete,
    setError
};