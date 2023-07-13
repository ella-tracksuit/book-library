const bookListContainer = document.getElementById("books-list-items");

function fetchAllBooks() {
  fetch("/books")
    .then((response) => response.json())
    .then((data) => {
      const books = data;

      const bookElements = books.map((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("getBooks");

        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = book.author;
        authorElement.classList.add("book-author");

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = book.description;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.classList.add("btn__secondary");
        updateButton.setAttribute("id", book.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn__secondary", "deleteButton");
        deleteButton.setAttribute("id", book.id);

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(descriptionElement);
        bookElement.appendChild(updateButton);
        bookElement.appendChild(deleteButton);

        return bookElement;
      });

      if (bookListContainer) {
        bookListContainer.innerHTML = "";
        bookElements.forEach((bookElement) => {
          bookListContainer.appendChild(bookElement);
        });
      } else {
        console.error("Book list container not found.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving books:", error);
    });
}

fetchAllBooks();
