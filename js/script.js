document.querySelectorAll(".shade-option").forEach((option, _, all) => {
  option.addEventListener("click", () => {
    all.forEach((item) => item.classList.remove("active"));
    option.classList.add("active");
  });
});

const products = document.querySelectorAll(".product-item");
document.querySelectorAll(".filter-btn, .collection-filter").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = (button.dataset.filter || button.getAttribute("data-filter") || "").toLowerCase();
    button.parentElement?.querySelectorAll(".filter-btn, .collection-filter").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const normFilter = filter.replace(/[^a-z0-9]/g, "");
    products.forEach((product) => {
      const cat = (product.dataset.category || product.getAttribute("data-category") || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      product.style.display = (filter === "all" || cat === normFilter) ? "" : "none";
    });
  });
});


// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {

  registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
      document.getElementById("registerName").value;

    const email =
      document.getElementById("registerEmail").value;

    const password =
      document.getElementById("registerPassword").value;


    // Check whether an account already exists

    const existingUser =
      localStorage.getItem("user");


    if (existingUser) {

      const user =
        JSON.parse(existingUser);

      if (user.email === email) {

        document.getElementById("registerMessage").textContent =
          "An account with this email already exists.";

        return;
      }
    }


    // Create user object

    const user = {

      name: name,

      email: email,

      password: password

    };


    // Save user

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    document.getElementById("registerMessage").textContent =
      "Registration successful!";


    // Redirect to login

    setTimeout(() => {

      window.location.href = "login.html";

    }, 1000);

  });

}




// LOGIN

const loginForm =
  document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email =
      document.getElementById("loginEmail").value;
    const password =
      document.getElementById("loginPassword").value;

    // Get stored user

    const storedUser =
      localStorage.getItem("user");


    if (!storedUser) {

      document.getElementById("loginMessage").textContent =
        "No account found. Please register first.";

      return;
    }


    const user =
      JSON.parse(storedUser);


    // Check credentials

    if (
      email === user.email &&
      password === user.password
    ) {

      // Create login session

      localStorage.setItem(
        "loggedIn",
        "true"
      );


      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );


      document.getElementById("loginMessage").textContent =
        "Login successful!";


      // Redirect

      setTimeout(() => {

        window.location.href = "index.html";

      }, 1000);

    }

    else {

      document.getElementById("loginMessage").textContent =
        "Incorrect email or password.";

    }

  });

}