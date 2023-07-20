function handleDeleteBook(event) {
  const button = event.target;
  const bookId = button.getAttribute("id");

  deleteBook(bookId);
}

function deleteBook(bookId) {
  fetch(`/books/${bookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAllBooks();
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
    });
}
