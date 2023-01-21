const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "bookId";
 
function addBook() {
   
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const book = makeBook(bookTitle, bookAuthor, bookYear, isCompleted);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    bookshelf.push(bookObject);

    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID)
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID)
    
    bookUncompleted.append(book)
    
    if (isCompleted) {
        bookCompleted.append(book);
    } 
    else {
        bookUncompleted.append(book);
    }
    
    updateDataToStorage()
}
  
 
function makeBook(title, penulis, tahun, isCompleted) {
    const textTitle = document.createElement('h3');
    textTitle.classList.add('titleclass')
    textTitle.innerText =  title;

    const textAuthor = document.createElement('p');
    textAuthor.classList.add('authorclass')
    textAuthor.innerText = penulis;
    
    const textTimestamp = document.createElement('p');
    textTimestamp.classList.add('timestampclass')
    textTimestamp.innerText = tahun;

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(textTitle, textAuthor, textTimestamp);

    const action = document.createElement('div')
    action.classList.add('action')
    textContainer.append(action)

    if(isCompleted){
        action.append(
            createUndoButton(),
            createTrashButton()
        );
    } 
    else {
        action.append(
            createCompleteButton(),
            createTrashButton()
        );
    }

    return textContainer;
}

function createButton(buttonTypeClass, eventListener, textButton){
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;
    button.addEventListener('click', function(event){
        eventListener(event);
    })
    return button;
}

function addBookToCompleted(bookElement){
    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const taskTitle = bookElement.querySelector('.book_item > .titleclass').innerText;
    const taskAuthor = bookElement.querySelector('.book_item > .authorclass').innerText;
    const taskTimestamp = bookElement.querySelector('.book_item > .timestampclass').innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskTimestamp, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;


    bookCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createCompleteButton(){
    return createButton('green', function(event){
    addBookToCompleted(event.target.parentElement.parentElement)
    }, "Selesai dibaca")
}


function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);

    let yes = confirm('yakin?????')

    if(yes){
        bookshelf.splice(bookPosition, 1);
        bookElement.remove();
        updateDataToStorage();
    }
    else{
        
    }
    
}


function createTrashButton() {
    return createButton("red", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
    }, 'Hapus Buku');
    
}


function undoBookFromCompleted(bookElement){
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const taskTitle = bookElement.querySelector('.book_item > .titleclass').innerText;
    const taskAuthor = bookElement.querySelector('.book_item > .authorclass').innerText;
    const taskTimestamp = bookElement.querySelector('.book_item > .timestampclass').innerText;
 
    const newBook = makeBook(taskTitle, taskAuthor, taskTimestamp, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    bookUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement
            );
    }, 'Belum Selesai');
}


