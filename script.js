/* ============================
   MOCK / FRONTEND-ONLY LOGIC
   ============================ */

// Utility helpers
function showMessage(message, type = "error") {
  const messageDiv = document.getElementById("message");
  if (!messageDiv) return;

  messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
  setTimeout(() => (messageDiv.innerHTML = ""), 3000);
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

/* ============================
   MOCK REGISTRATION
   ============================ */

function handleRegister(event) {
  event.preventDefault();

  const userType = document.getElementById("userType").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const identifier =
    userType === "student"
      ? document.getElementById("studentNumber").value
      : document.getElementById("staffNumber").value;

  // Mock user object
  const newUser = {
    id: Date.now(),
    userType,
    firstName,
    lastName,
    email,
    identifier,
    password // stored only for demo purposes
  };

  // Save to mock database (localStorage)
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Account created successfully! Redirecting to login...", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

/* ============================
   MOCK LOGIN (ANY DATA WORKS)
   ============================ */

function handleLogin(event) {
  event.preventDefault();

  const userType = document.getElementById("userType").value;
  const identifier = document.getElementById("identifier").value;

  // Create mock logged-in user (NO validation)
  const mockUser = {
    id: Date.now(),
    userType,
    identifier,
    firstName: "Demo",
    lastName: userType === "student" ? "Student" : "Staff",
    email: "demo@tut4life.ac.za"
  };

  setCurrentUser(mockUser);

  showMessage("Login successful! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}

/* ============================
   LOGOUT
   ============================ */

function logout() {
  clearCurrentUser();
  window.location.href = "index.html";
}

/* ============================
   MOCK DATA FOR VIEWING
   ============================ */

function loadAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Semester Tests",
      content: "Semester tests begin next week. Check your timetable.",
      date: "2026-03-10"
    },
    {
      id: 2,
      title: "Career Expo",
      content: "Annual Career Expo at Pretoria Campus.",
      date: "2026-03-15"
    }
  ];

  const container = document.getElementById("announcements");
  if (!container) return;

  container.innerHTML = "";

  announcements.forEach(a => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>📢 ${a.title}</strong>
      <p>${a.content}</p>
      <small>${a.date}</small>
    `;
    container.appendChild(div);
  });
}

/* ============================
   PAGE GUARD (OPTIONAL)
   ============================ */

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}
