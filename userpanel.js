// User Data
const user = { name: "John Doe", email: "john.doe@example.com" };
const books = JSON.parse(localStorage.getItem("books")) || [];
const requests = JSON.parse(localStorage.getItem("requests")) || [];

// Navigation
function navigateTo(sectionId) {
    document.querySelectorAll("section").forEach(section => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

// Render Books for User
function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = books.map((book, index) => `
        <div class="card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Subject:</strong> ${book.subject}</p>
            <button onclick="requestBook(${index})">Request</button>
        </div>
    `).join("");
}

// Search Books
function filterBooks() {
    const query = document.getElementById("userSearchBooks").value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.subject.toLowerCase().includes(query)
    );
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = filteredBooks.map((book, index) => `
        <div class="card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Subject:</strong> ${book.subject}</p>
            <button onclick="requestBook(${index})">Request</button>
        </div>
    `).join("");
}

// Request Book
function requestBook(index) {
    const book = books[index];
    const newRequest = {
        user: user.name,
        email: user.email,
        bookTitle: book.title,
        status: "Pending"
    };
    requests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(requests));
    alert(`Request for "${book.title}" sent successfully!`);
    renderUserRequests();
}

// Render User Requests
function renderUserRequests() {
    const userRequests = requests.filter(req => req.email === user.email);
    const requestList = document.getElementById("requestList");
    requestList.innerHTML = userRequests.map(req => `
        <div class="card">
            <h3>${req.bookTitle}</h3>
            <p><strong>Status:</strong> ${req.status}</p>
        </div>
    `).join("");
}

// Logout
function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html";
}

// Initialize User Panel
function initUserPanel() {
    renderBooks();
    renderUserRequests();
    navigateTo("availableBooks");
}

initUserPanel();
function renderAvailableBooks() {
    books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = books.map(book => `
        <div class="card">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>ISBN: ${book.isbn}</p>
            <p>Subject: ${book.subject}</p>
            <button onclick="requestBook('${book.title}')">Request</button>
        </div>
    `).join('');
}
function requestBook(bookTitle) {
    const userRequest = {
        title: bookTitle,
        user: currentUser.name,
        status: "Pending",
    };

    currentUser.bookRequests.push(userRequest);
    localStorage.setItem("users", JSON.stringify(users));
    renderRequests();
}
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// On load
window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
};
