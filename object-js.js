let myLibrary = [];


//This array is used for examples (or loaded by default)
const booksToAdd = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
    genre: "Fantasy"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    pages: 412,
    read: true,
    genre: "Science Fiction"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    read: true,
    genre: "Self-help"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    pages: 352,
    read: false,
    genre: "Programming"
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: true,
    genre: "Dystopian"
  }
];

    const notification = document.querySelector("#notification")
const addDialog = document.querySelector("#add-dialog")
const addBook = document.getElementById("add-book")
const form = document.querySelector("form")

const addButton = document.getElementById("add-button")

function Book(title,author,pages,genre,read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
    this.info = function(){
        return `[ID : ${this.id}]\n ${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "Already read": "Not read yet"}`
    }
    this.retrieveId = function(){return this.id}
    this.toggleStatus = function(){this.read = !this.read}
}

function addBookToLibrary(item){
        const newBook = new Book(item.title, item.author, item.pages,item.genre, item.read);
        myLibrary.push(newBook)
        return newBook.retrieveId()
}

function addCardFromLibrary(bookId, item){
    const bookList = document.querySelector(".book-lists")
    // console.log(item.title)
    const bookCard = document.createElement("article")
    bookCard.setAttribute("book-id", bookId)
    bookCard.classList.add("card-book")

    const titleBook = document.createElement("h3")
    titleBook.classList.add("book-title")
    titleBook.textContent = item.title

    const authorBook = document.createElement("h4")
    authorBook.classList.add("book-author")
    authorBook.textContent = item.author

    const genreBook = document.createElement("p")
    genreBook.classList.add("book-genres")
    genreBook.textContent = item.genre

    const bottomCard = document.createElement("div")
    bottomCard.classList.add("bottom-card") 

    const pageBook = document.createElement("span")
    pageBook.classList.add("book-page")
    pageBook.textContent = item.pages + " pages"
    
    const statusBook = document.createElement("button")
    statusBook.classList.add(`book-status`)
    statusBook.setAttribute("value",`${item.read}`)
    statusBook.textContent = item.read? "Already Read" : "Not Read Yet"

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    deleteButton.textContent = "Remove?"

    deleteButton.addEventListener("click",()=>{
        bookCard.remove()
        myLibrary = myLibrary.filter(i=>
            i.id !== bookId)
        notification.style.backgroundColor = "rgba(200, 0, 0, 0.45)"
        notification.textContent = "Existing book is successfully deleted"
        console.log(myLibrary)
    })

    statusBook.addEventListener("click",()=>{
        const findBook = myLibrary.find(i=>i.id == bookId)
        findBook.read = !findBook.read
        statusBook.setAttribute("value",`${findBook.read}`)
        statusBook.textContent = findBook.read? "Already Read" : "Not Read Yet"
        console.log(findBook.info())
    })
    
    bookCard.appendChild(titleBook)
    bookCard.appendChild(authorBook)
    bookCard.appendChild(pageBook)
    bookCard.appendChild(genreBook)
    bookCard.appendChild(bottomCard)
    bottomCard.appendChild(deleteButton)
    bottomCard.appendChild(statusBook)
    bookList.appendChild(bookCard)

}


function addInputForm(){
    const title = form.querySelector("#title")
    const author = form.querySelector("#author")
    const genres = form.querySelector("#genres")
    const pages = form.querySelector("#pages")
    const status = form.querySelector("#status")
    const newBook = {
        title: title.value,
        author: author.value,
        pages: Number(pages.value),
        read: Boolean(status),
        genre: genres.value
    }
    booksToAdd.push(newBook)
    const bookId = addBookToLibrary(booksToAdd)
    addCardFromLibrary(bookId,newBook)

    form.reset()
    addDialog.close();

}

addBook.addEventListener("click", ()=>{
    addDialog.showModal();
})

addDialog.addEventListener("close",(e)=>{
    notification.style.backgroundColor = "rgba(0, 200, 0, 0.45)"
    notification.textContent = "New book is successfully added"
})

addButton.addEventListener("click",(e)=>{
    e.preventDefault();
    addInputForm()
})

booksToAdd.map((item)=>{
    const newId = addBookToLibrary(item)
    addCardFromLibrary(newId, item)
})




