function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === password && username.length >= 1) {
        alert("Login Successful");
        window.localStorage.setItem("loginStatus", "true");
        window.location.href = "./orders.html"; // Redirecting to other page.
    } else {
        alert("Please enter valid credentials!");
    }
}

let status = window.localStorage.getItem("loginStatus");
if (status == "true") {
    window.location.href = "./orders.html";
}

