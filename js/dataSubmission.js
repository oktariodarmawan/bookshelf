const STORAGE_KEY = "BOOK_APPS";
 
let bookshelf = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(bookshelf);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       bookshelf = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(title, penulis, tahun, isCompleted) {
   return {
       id: +new Date(),
       title,
       penulis,
       tahun,
       isCompleted
   };
}
 
function findBook(bookId) {
   for(book of bookshelf){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0
   for (book of bookshelf) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}


function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  
  
    for(book of bookshelf){
        const newBook = makeBook(book.title, book.penulis, book.tahun, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }
 