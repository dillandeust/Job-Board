const url = "http://localhost:8080/api/companies";
const redirectLogin = document.getElementById("redirectLogin");

redirectLogin.addEventListener("click", () => {
  window.location = "/client/pages/login.html";
});

form.addEventListener("submit", (e) => {
  // Prevent default behavior
  e.preventDefault();
  // Create new FormData object:
  const formData = new FormData(form);

  // Convert formData object to URL-encoded string:
  const payload = new URLSearchParams(formData);

  fetch(url, {
    method: "POST",
    body: payload,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
        window.location.replace("/client/pages/login.html");
    })
    .catch(console.error);
});