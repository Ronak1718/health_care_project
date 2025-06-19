function showSignUp() {

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "flex";
    document.getElementById("heading_SignUp").innerText = "SIGN UP";
    document.getElementById("heading_login").innerText = '';
  }

  function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("heading_login").innerText = "LOGIN";
    document.getElementById("heading_SignUp").innerText = '';
  }

function loginUser() {
  localStorage.setItem("loggedIn", "true");
  alert("Login successful!");
  window.location.href = "index.html"; 
  return false;
}
function signupUser() {
  alert("Account created!");
  showLogin(); 
  return false;
}
