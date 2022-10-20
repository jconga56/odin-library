let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.index = 0
}

Object.defineProperty(Book, "setRead", {
    set : function (value) {
        if(value == 'true'){
            this.read = true
        }
        else{
            this.read = false
        }
    }
})

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read" : "not read yet"}`
}

function addBookToLibrary(library, book){
    library.push(book)
    book.index = library.length - 1
}

function updateBookIndex(library){
    for(let i = 0; i < library.length; i++){
        library[i].index = i
    }
}

function createBookDiv(book) {
    const div = document.createElement('div')
    const removeBtn = document.createElement('button')
    const readBtn = document.createElement('button')
    div.classList.add('book')
    div.textContent = book.info()
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', ()=>{
        myLibrary.splice(book.index, 1)
        updateBookIndex(myLibrary)
        printLibrary(myLibrary)
    })
    readBtn.textContent = "Toggle Read"
    readBtn.addEventListener('click', ()=>{
        book.read = !book.read
        printLibrary(myLibrary)
    })
    div.appendChild(removeBtn)
    div.appendChild(readBtn)
    return div;
}

function printLibrary(library){
    const libraryContainer = document.querySelector('.book-container')
    libraryContainer.textContent = ''
    for(book in library){
        libraryContainer.appendChild(createBookDiv(library[book]))
    }
}

printLibrary(myLibrary)

const newBookBtn = document.getElementById('new-book')
const popupForm = document.querySelector('.popup-form')
const submitBtn = document.getElementById('submit')



newBookBtn.addEventListener('click', (event)=>{
    popupForm.classList.toggle('hidden')
})

submitBtn.addEventListener('click', ()=>{
    const bookAttributes = ['title', 'author', 'pages', 'read']
    const newBook = new Book()
    for(attr in bookAttributes){
        const input = document.getElementById(bookAttributes[attr])
        newBook[bookAttributes[attr]] = input.value
        input.value = ''
    }
    addBookToLibrary(myLibrary, newBook)
    printLibrary(myLibrary)
    popupForm.classList.add('hidden')
})
