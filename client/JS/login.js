const url = "http://localhost:8080/api/users/auth";
const redirectRegister = document.getElementById("redirectRegister");

redirectRegister.addEventListener("click", () => {
  window.location = "/client/index.html";
});

form.addEventListener("submit", (e) => {
  // Prevent default behavior
  e.preventDefault();
  // Create new FormData object:
  const formData = new FormData(form);

  // Convert formData object to URL-encoded string:
  const payload = new URLSearchParams(formData);

  console.log(payload);

  fetch(url, {
    method: "POST",
    body: payload,
    mode: "cors",
  })
    .then((response) => response.json())
    .then((json) => {
      window.location.replace("/client/pages/router.html"); // <= HERE
      console.log(json);
    })
    .catch(console.error);
});

const deleteUsers = async () => {
  try {
    console.log("Deleting users...");

    const response = await (
      await fetch(
        `http://localhost:8080/api/users/`,
        {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      )
    ).json();
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

//deleteUsers();