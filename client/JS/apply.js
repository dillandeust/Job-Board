const url = "http://localhost:8080/api/applyings";

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
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.replace('/client/pages/home.html');
    });
});