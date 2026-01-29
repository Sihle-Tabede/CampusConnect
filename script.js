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

/* ============================
   MOCK DASHBOARD FUNCTIONALITY
   ============================ */

// Submit academic support request (mock)
function submitRequest() {
  const user = getCurrentUser();
  if (!user) return;

  const type = document.getElementById("supportType").value;
  const details = document.getElementById("supportDetails").value;

  if (!type || !details) {
    alert("Please complete all fields");
    return;
  }

  const requests = JSON.parse(localStorage.getItem("requests") || "[]");

  requests.push({
    id: Date.now(),
    userId: user.id,
    type,
    details,
    status: "Pending",
    timestamp: new Date().toISOString()
  });

  localStorage.setItem("requests", JSON.stringify(requests));

  document.getElementById("supportType").value = "";
  document.getElementById("supportDetails").value = "";

  alert("Request submitted successfully!");
  loadRequests();
}

// Load user-specific requests
function loadRequests() {
  const user = getCurrentUser();
  const container = document.getElementById("requests");
  if (!user || !container) return;

  const requests = JSON.parse(localStorage.getItem("requests") || "[]")
    .filter(r => r.userId === user.id);

  container.innerHTML = "";

  if (requests.length === 0) {
    container.innerHTML = "<p>No requests submitted yet.</p>";
    return;
  }

  requests.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${r.type}</strong><br>
      ${r.details}<br>
      <small>${new Date(r.timestamp).toLocaleDateString()}</small><br>
      Status: <span class="status pending">${r.status}</span>
    `;
    container.appendChild(div);
  });
}

// Mock announcements
function loadAnnouncements() {
  const announcements = [
    {
      title: "Semester Tests",
      content: "Semester tests begin next week. Please check your timetable.",
      date: "2026-03-10"
    },
    {
      title: "Career Expo",
      content: "Annual Career Expo at Pretoria Campus. All students welcome.",
      date: "2026-03-15"
    },
    {
      title: "System Maintenance",
      content: "CampusConnect will be under maintenance this weekend.",
      date: "2026-03-20"
    }
  ];

  const container = document.getElementById("announcements");
  if (!container) return;

  container.innerHTML = "";

  announcements.forEach(a => {
    const div = document.createElement("div");
    div.className = "card announcement-card";
    div.innerHTML = `
      <strong>📢 ${a.title}</strong>
      <p>${a.content}</p>
      <small>${a.date}</small>
    `;
    container.appendChild(div);
  });
}

// Submit feedback (mock)
function submitFeedback() {
  const user = getCurrentUser();
  if (!user) return;

  const feedbackType = document.getElementById("feedbackType").value;
  const feedback = document.getElementById("feedback").value;

  if (!feedback) {
    alert("Please enter feedback");
    return;
  }

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");

  feedbacks.push({
    id: Date.now(),
    userId: user.id,
    type: feedbackType,
    feedback,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  document.getElementById("feedback").value = "";
  alert("Thank you for your feedback!");
}

