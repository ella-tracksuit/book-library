const updateBookForm = document.getElementById("update-book-form");
const updatedTitle = document.getElementById("update-title");
const updatedAuthor = document.getElementById("update-author");
const updatedDescription = document.getElementById("update-description");

updateBookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const updatedBook = {
    title: updatedTitle.value,
    author: updatedAuthor.value,
    description: updatedDescription.value,
  };

  updateBook(updatedBook, bookId);
});

function updateBook(updatedBook, bookId) {
  fetch(`/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "updated-Book": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAllBooks();
      console.log("Book updated successfully:", data.message);
    })
    .catch((error) => {
      console.error("Error updating book:", error);
    });
}
