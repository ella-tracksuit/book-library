const bookListContainer = document.getElementById("books-list-items");

function fetchAllBooks() {
  fetch("/books")
    .then((response) => response.json())
    .then((data) => {
      const books = data;

      const bookElements = books.map((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-item");

        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = book.author;
        authorElement.classList.add("book-author");

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = book.description;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.classList.add("btn__secondary", "update-button");
        updateButton.setAttribute("id", book.book_id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn__secondary", "delete-button");
        deleteButton.setAttribute("id", book.book_id);

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(descriptionElement);
        bookElement.appendChild(updateButton);
        bookElement.appendChild(deleteButton);

        updateButton.addEventListener("click", () => {
          handleUpdateButtonClick(book);
        });
        deleteButton.addEventListener("click", handleDeleteBook);

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

function handleUpdateButtonClick(book) {
  const updatedTitle = document.getElementById("update-title");
  const updatedAuthor = document.getElementById("update-author");
  const updatedDescription = document.getElementById("update-description");
  const updatedId = document.getElementById("update-id");

  updatedTitle.value = book.title;
  updatedAuthor.value = book.author;
  updatedDescription.value = book.description;
  updatedId.value = book.book_id;
}

fetchAllBooks();
