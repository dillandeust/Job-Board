const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const birthday = document.getElementById('birthday');
const skills = document.getElementById("skills");

const editButton = document.getElementById('editBtn');

const userProfile = document.getElementById('userData');
const updateForm = document.getElementById('updateForm');

const redirectHome = document.getElementById('redirectHome');

const redirectProfile = document.getElementById('redirectProfile');

redirectHome.addEventListener('click', () => {
  window.location.replace('/client/pages/home.html');
})

redirectProfile.addEventListener('click', () => {
    window.location.reload();
})

editButton.addEventListener('click', () => {
    userProfile.style.display = 'none';
    updateForm.classList.toggle('update-on');
});

const getUsers = async () => {
  try {
    console.log("Fetching users...");

    const response = await (
      await fetch("http://localhost:8080/api/users/", {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    // check which user is logged in
    const loggedInUser = response.filter((user) => user.islogedin === 1);

    //const userLoginId = loggedInUser[0].id;

    firstName.textContent = loggedInUser[0].firstname;
    lastName.textContent = loggedInUser[0].lastname;
    email.textContent = loggedInUser[0].email;
    birthday.textContent = loggedInUser[0].birthday;
    phoneNumber.textContent = loggedInUser[0].phone;
    skills.textContent = loggedInUser[0].skills;

    form.addEventListener("submit", (e) => {
      // Prevent default behavior
      e.preventDefault();
      // Create new FormData object:
      const formData = new FormData(form);
    
      // Convert formData object to URL-encoded string:
      const payload = new URLSearchParams(formData);
    
      fetch(`http://localhost:8080/api/users/${loggedInUser[0].id}`, {
        method: "PUT",
        body: payload,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
        .catch(console.error);
    });

  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

getUsers();