//import $ from 'jquery';
const items = [];
let error = null;
let filterItem = false;
let filterValue = 0;



const addItem = function (item) {
    this.items.push(item);
};

// const updateValue = function (items){

//     this.filterValue= $(document.body).on('change',"#js-filter", () =>  {
//         this.filterValue = $("#js-filter option:selected").val(); 
//     });
//     return filterValue;
// };

// const filterList = function (item) {

    
    
//     filterValue= item
//     console.log(filterValue)

// };
//console.log(currentItem)
const findAndDelete = function (id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const unHide = function (){
    this.removeClass("hidden");
};
const hide = function (){
    this.addClass("hidden");
};

const setError = function (error) {
    this.error = error;
};

export default {
    items,
    error,
    //updateValue,
    filterValue,
    unHide,
    hide,
    addItem,
    findAndDelete,
    setError
};