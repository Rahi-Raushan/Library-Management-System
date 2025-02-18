// Define DOM Elements
const adminLoginBtn = document.getElementById("adminLoginBtn");
const userLoginBtn = document.getElementById("userLoginBtn");
const userSignupBtn = document.getElementById("userSignupBtn");

const adminLoginModal = document.getElementById("adminLoginModal");
const userLoginModal = document.getElementById("userLoginModal");
const userSignupModal = document.getElementById("userSignupModal");

const closeAdminLogin = document.getElementById("closeAdminLogin");
const closeUserLogin = document.getElementById("closeUserLogin");
const closeUserSignup = document.getElementById("closeUserSignup");

const adminLoginForm = document.getElementById("adminLoginForm");
const userLoginForm = document.getElementById("userLoginForm");
const userSignupForm = document.getElementById("userSignupForm");

// Modal Handlers
function showModal(modal) {
    modal.classList.remove("hidden");
}

function closeModal(modal) {
    modal.classList.add("hidden");
}

// Admin Login
adminLoginBtn.addEventListener("click", () => showModal(adminLoginModal));
closeAdminLogin.addEventListener("click", () => closeModal(adminLoginModal));

adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    if (email === "admin@gmail.com" && password === "admin@123") {
        alert("Admin login successful!");
        window.location.href = "adminpanel.html"; // Redirect to admin panel
    } else {
        alert("Invalid admin credentials!");
    }
});

// User Signup
userSignupBtn.addEventListener("click", () => showModal(userSignupModal));
closeUserSignup.addEventListener("click", () => closeModal(userSignupModal));

userSignupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    closeModal(userSignupModal);
});

// User Login
userLoginBtn.addEventListener("click", () => showModal(userLoginModal));
closeUserLogin.addEventListener("click", () => closeModal(userLoginModal));

userLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "userpanel.html";
    } else {
        alert("Invalid user credentials!");
    }
});
