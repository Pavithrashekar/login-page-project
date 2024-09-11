// Validate form inputs
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const message = document.getElementById("message");
    const loadingSpinner = document.getElementById("loading");

    // Clear previous messages
    message.innerHTML = "";

    // Basic email and password validation
    if (!validateEmail(email)) {
      message.innerHTML = "Please enter a valid email address.";
      return;
    }
    if (password.length < 6) {
      message.innerHTML = "Password must be at least 6 characters long.";
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = "block";

    // Simulate API Call
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        message.innerHTML = "Login successful!";
        message.style.color = "green";

        // Save credentials to localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        }
      } else {
        message.innerHTML = "Login failed. Please try again.";
      }
    } catch (error) {
      message.innerHTML = "An error occurred. Please try again later.";
    } finally {
      // Hide loading spinner
      loadingSpinner.style.display = "none";
    }
  });

// Email validation function
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

// Toggle password visibility
function togglePassword() {
  const passwordField = document.getElementById("password");
  passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Pre-fill form if "Remember Me" was previously checked
window.onload = function () {
  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");

  if (savedEmail && savedPassword) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("password").value = savedPassword;
    document.getElementById("rememberMe").checked = true;
  }
};
