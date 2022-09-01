function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// UI Constructor

function UI() {}

//  Adding book to the library

UI.prototype.addBookToLibrary = function (book) {
    const list = document.querySelector("#book-list");
    // create tr element
    const row = document.createElement("tr");
    // inserting  a book
    let checkbox = '<input type = "checkbox" class="form-check-input">';
    if (book.read) {
        checkbox = '<input type = "checkbox" class="form-check-input" checked>';
    }
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${checkbox}</td>
            <td><a href="#" class="delete">X<a></td>
  `;
    list.appendChild(row);
};

// show alert

UI.prototype.showAlert = function (message, className) {
    // create div
    const div = document.createElement("div");
    //  add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".input-container");
    const form = document.querySelector("#form-input");
    // insert alert
    container.insertBefore(div, form);
    // time out after 3 seconds
    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
};

// Delete Book
UI.prototype.deleteBook = (target) => {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
};

// clear fields

UI.prototype.clearFields = function () {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
};

document.getElementById("form-input").addEventListener("submit", (e) => {
    const title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        pages = document.querySelector("#pages").value,
        read = document.querySelector("#read").checked;

    const book = new Book(title, author, pages, read);

    // instantiate UI

    const ui = new UI();

    // validate

    if (title === "" || author === "" || pages === "") {
        // error alert
        ui.showAlert("Please fill in all fields", "error");
    } else {
        // Add book to the list

        ui.addBookToLibrary(book);

        // success alert

        ui.showAlert("Book Added", "success");

        // clear fields

        ui.clearFields();
    }

    e.preventDefault();
});

// event for delete operation.

document.getElementById("book-list").addEventListener("click", (e) => {
    // instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);
    // Show Deletion alert

    ui.showAlert("Book deleted successfully.", "success");

    e.preventDefault();
});
