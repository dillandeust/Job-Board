const url = "http://localhost:8080/api/users";
const redirectLogin = document.getElementById("redirectLogin");
const companyName = document.getElementById('companyNameContainer');
const companyCheck = document.getElementById('checkboxCompany');

companyCheck.addEventListener('click', () => {
  if (!companyCheck.checked) {
    companyName.classList.remove('input-container');
    companyName.classList.add('closed');
  } else {
    companyName.classList.remove('closed');
    companyName.classList.add('input-container');
  }
})




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
      if (json.companie === "on") {
        window.location.replace("/client/pages/companyRegister.html");
      } else {
        window.location.replace("/client/pages/login.html");
      }
    })
    .catch(console.error);
});

/* const deleteUsers = async () => {
  try {
    console.log("Fetching new data...");

    const response = await (
      await fetch('http://localhost:8080/api/users/3', {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    console.log(response);
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

deleteUsers(); */
