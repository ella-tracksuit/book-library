document
  .getElementById("update-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const updatedBook = {
      id: data.get("id"),
      title: data.get("title"),
      author: data.get("author"),
      description: data.get("description"),
    };

    updateBook(updatedBook);

    const updateForm = document.getElementById("update-book-form");
    updateForm.reset();
  });

function updateBook(updatedBook) {
  fetch(`/books/${updatedBook.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
