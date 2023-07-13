const deleteButtons = document.querySelectorAll(".deleteButton");

deleteButtons.forEach((button) => {
  button.addEventListener("click", handleDeleteBook);
});

function handleDeleteBook(event) {
  const button = event.target;
  const bookId = button.data.id;

  deleteBook(bookId);
}

function deleteBook(bookId) {
  fetch(`/books/${bookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Book deleted successfully:", data.message);
      fetchAllBooks();
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
    });
}
