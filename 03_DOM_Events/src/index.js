function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

///////////////////
// render functions
///////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {

  const li = document.createElement('li');
  li.className = 'list-li';

  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;

  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);

  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  btn.addEventListener('click' , (event) => {
    li.remove();
  })

  li.append(h3, pAuthor, pPrice, img, btn);

  document.querySelector('#book-list').append(li);
}


////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);

//
// for (let i = 0; index < bookStore.inventory.length; index++) {
//   const book = bookStore.inventory[i]
//   renderBook(book)
// }


const newBookButton = document.querySelector('#toggleForm')
newBookButton.addEventListener('click' , (event) => {
  const form = document.querySelector('#book-form')
  if (form.className === 'collapsed') {
    form.classList.remove("collapsed")
    //select button and change text
    newBookButton.textContent = 'Collapse Form'
  } else {
    form.classList.add("collapsed")
    //select button and change text
    newBookButton.textContent = 'New Book'
  }
})


const bookForm = document.querySelector('#book-form')
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#form-title')
  const author = document.querySelector('#form-author')
  const price = document.querySelector('#form-price')
  const image = document.querySelector('#form-imageUrl')
  console.log(image.value)
  const inventory = document.querySelector('#form-inventory')



  const newBook = {
      title: title.value,
      author: author.value,
      price: parseInt(price.value),
      inventory: inventory.value,
      imageUrl: image.value,
  }
  renderBook(newBook)
  bookForm.reset();

})

