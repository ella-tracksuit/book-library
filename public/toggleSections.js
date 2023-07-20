const sections = {
  bookList: document.getElementById("book-list-box"),
  updateBook: document.getElementById("update-book-form-box"),
  addBook: document.getElementById("add-book-form-box"),
};

let activeSection = "bookList";

Object.keys(sections).forEach((key) => {
  if (key !== activeSection) {
    hide(sections[key]);
  }
});

function show(element) {
  element.style.display = "";
}

function hide(element) {
  element.style.display = "none";
}

function showSection(newActiveSection) {
  const activeSectionElement = sections[activeSection];
  const newActiveSectionElement = sections[newActiveSection];

  const formElement = activeSectionElement.getElementsByTagName("form")[0];
  if (formElement) {
    formElement.reset();
  }

  hide(activeSectionElement);
  show(newActiveSectionElement);

  activeSection = newActiveSection;
}

window.showSection = showSection;
