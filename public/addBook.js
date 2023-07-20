const addBookForm = document.getElementById("add-book-form");
const bookList = document.getElementById("books-list-items");

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  console.log([...data.keys()]);

  const newBook = {
    title: data.get("title"),
    author: data.get("author"),
    description: data.get("description"),
  };

  addBook(newBook);
});

function addBook(book) {
  return fetch("/books/add", {
    method: "POST",
    headers: {
      "new-book": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then(() => fetchAllBooks())
    .then(() => {
      addBookForm.reset();
      showSection("bookList");
    })
    .catch((error) => {
      console.error("Error adding book:", error);
    });
}
