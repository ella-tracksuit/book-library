// function toggleFormBox() {
//   const addButton = document.querySelector(".btn__add-book");
//   const formBox = document.getElementById(".add-book-form-box");

//   addButton.addEventListener("click", function () {
//     formBox.classList.toggle("hidden");
//   });
// }
// toggleFormBox();

const addBookForm = document.querySelector(".form");
const bookList = document.getElementById("books-list-items");

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("new-title");
  const authorInput = document.getElementById("new-author");
  const descriptionInput = document.getElementById("new-description");

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    description: descriptionInput.value,
  };

  fetch("/books/add", {
    method: "POST",
    headers: {
      "new-book": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((response) => response.json())
    .then((data) => {
      const bookElement = createBookElement(newBook);
      bookList.appendChild(bookElement);
      fetchAllBooks();
      console.log("Book added successfully:", data.message);
    })
    .catch((error) => {
      console.error("Error adding book:", error);
    });

  addBookForm.reset();
});

function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  const titleElement = document.createElement("h3");
  titleElement.textContent = book.title;

  const authorElement = document.createElement("p");
  authorElement.textContent = `Author: ${book.author}`;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = `Description: ${book.description}`;

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(descriptionElement);

  return bookElement;
}
