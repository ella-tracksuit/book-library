const updateBookForm = document.getElementById("update-book-form");

updateBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(event.target);

  const updatedBook = {
    id: data.get("id"),
    title: data.get("title"),
    author: data.get("author"),
    description: data.get("description"),
  };

  updateBook(updatedBook).then(() => {
    updateBookForm.reset();
  });
});

function updateBook(updatedBook) {
  return fetch(`/books/${updatedBook.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then((response) => response.json())
    .then(() => fetchAllBooks())
    .then(() => {
      addBookForm.reset();
      showSection("bookList");
    })
    .catch((error) => {
      console.error("Error updating book:", error);
    });
}
