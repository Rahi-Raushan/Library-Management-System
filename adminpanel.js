// Local storage references
const books = JSON.parse(localStorage.getItem('books')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const requests = JSON.parse(localStorage.getItem('bookRequests')) || [];

// Initialize Admin Panel
function initializeAdminPanel() {
  renderBooks();
  renderUsers();
  renderRequests();
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Admin logged out!');
  window.location.href = 'index.html';
});

// Show sections
function showSection(sectionId) {
  document.querySelectorAll('section').forEach((section) => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Manage books
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const subject = document.getElementById('subject').value;
  const year = parseInt(document.getElementById('year').value);

  books.push({ title, author, isbn, subject, year });
  localStorage.setItem('books', JSON.stringify(books));

  alert('Book added successfully!');
  e.target.reset();
  renderBooks();
});

function renderBooks() {
  const booksTable = document.querySelector('#booksTable tbody');
  booksTable.innerHTML = '';

  books.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.subject}</td>
      <td>${book.year}</td>
      <td>
        <button class="edit" onclick="editBook(${index})">Edit</button>
        <button class="delete" onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    booksTable.appendChild(row);
  });
}

function editBook(index) {
  const book = books[index];
  const title = prompt('Enter new title:', book.title);
  const author = prompt('Enter new author:', book.author);
  const isbn = prompt('Enter new ISBN:', book.isbn);
  const subject = prompt('Enter new subject:', book.subject);
  const year = prompt('Enter new publication year:', book.year);

  if (title && author && isbn && subject && year) {
    books[index] = { title, author, isbn, subject, year: parseInt(year) };
    localStorage.setItem('books', JSON.stringify(books));
    alert('Book updated successfully!');
    renderBooks();
  }
}

function deleteBook(index) {
  if (confirm('Are you sure you want to delete this book?')) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
}

// Manage users
function renderUsers() {
  const usersTable = document.querySelector('#usersTable tbody');
  usersTable.innerHTML = '';

  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.dob}</td>
      <td>${user.username}</td>
      <td>
        <button class="edit" onclick="editUser(${index})">Edit</button>
        <button class="delete" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    usersTable.appendChild(row);
  });
}

function editUser(index) {
  const user = users[index];
  const name = prompt('Enter new name:', user.name);
  const email = prompt('Enter new email:', user.email);
  const dob = prompt('Enter new DOB:', user.dob);
  const gender = prompt('Enter new gender:', user.gender);
  const username = prompt('Enter new username:', user.username);

  if (name && email && dob && gender && username) {
    users[index] = { name, email, dob, gender, username, password: user.password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('User updated successfully!');
    renderUsers();
  }
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
}
}

// Manage book requests
function renderRequests() {
const requestsTable = document.querySelector('#requestsTable tbody');
requestsTable.innerHTML = '';

requests.forEach((request, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${request.username}</td>
    <td>${request.bookTitle}</td>
    <td>${request.status}</td>
    <td>
      <button class="approve" onclick="approveRequest(${index})">Approve</button>
      <button class="reject" onclick="rejectRequest(${index})">Reject</button>
    </td>
  `;
  requestsTable.appendChild(row);
});
}

function approveRequest(index) {
requests[index].status = 'Approved';
localStorage.setItem('bookRequests', JSON.stringify(requests));
alert(`Request approved for book: ${requests[index].bookTitle}`);
sendNotification(requests[index].username, requests[index].bookTitle, 'Approved');
renderRequests();
}

function rejectRequest(index) {
requests[index].status = 'Rejected';
localStorage.setItem('bookRequests', JSON.stringify(requests));
alert(`Request rejected for book: ${requests[index].bookTitle}`);
sendNotification(requests[index].username, requests[index].bookTitle, 'Rejected');
renderRequests();
}

// Simulate sending a notification
function sendNotification(username, bookTitle, status) {
const user = users.find((u) => u.username === username);
if (user) {
  alert(`Notification sent to ${user.email}:\nYour request for "${bookTitle}" has been ${status}.`);
}
}

// Initialize admin panel on load
initializeAdminPanel();
