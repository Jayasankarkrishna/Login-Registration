// Client-side JavaScript
document.getElementById("login-form").addEventListener("submit", loginUser);
document.getElementById("register-form").addEventListener("submit", registerUser);

function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Make an AJAX request to the server for login
  // Example: Using fetch API
  fetch("/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
  })
      .then(response => response.json())
      .then(data => {
          // Handle login response
          if (data.message) {
              console.log(data.message); // Optional: Display message in the console
              showLoginMessage(data.message);
          } else {
              console.error("Login error:", data.error); // Optional: Display error in the console
              showLoginMessage("Invalid credentials. Please try again.");
          }
      })
      .catch(error => {
          console.error(error);
          showLoginMessage("Login failed. Please try again.");
      });
}

function showLoginMessage(message) {
  const loginMessage = document.getElementById("login-message");
  loginMessage.textContent = message;
}


function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  // Make an AJAX request to the server for registration
  // Example: Using fetch API
  fetch("/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
  })
      .then(response => response.json())
      .then(data => {
          // Handle registration response
          if (data.message) {
              console.log(data.message); // Optional: Display message in the console
              showRegistrationMessage(data.message);
          } else {
              console.error("Registration error:", data.error); // Optional: Display error in the console
              showRegistrationMessage("Registration failed. Please try again.");
          }
      })
      .catch(error => {
          console.error(error);
          showRegistrationMessage("Registration failed. Please try again.");
      });
}

function showRegistrationMessage(message) {
  const registrationMessage = document.getElementById("registration-message");
  registrationMessage.textContent = message;
}