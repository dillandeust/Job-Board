const redirectHome = document.getElementById("redirectHome");
const applyJob = document.getElementById("redirectApply");
const redirectProfile = document.getElementById("redirectProfile");
const viewProfileRedirect = document.getElementById("viewProfileRedirect");
const deleteAccount = document.getElementById("deleteAccount");

const jobDescriptionContainer = document.querySelector(".job-description");


const updateForm = document.querySelector(".apply-form");
const jobHeader = document.querySelector(".job-header");

redirectProfile.addEventListener("click", () => {
  window.location = "/client/pages/userprofile.html";
});

viewProfileRedirect.addEventListener("click", () => {
  window.location = "/client/pages/userprofile.html";
});

redirectHome.addEventListener("click", () => {
  window.location = "/client/pages/userhome.html";
});

applyJob.addEventListener("click", () => {
  window.location = "/client/pages/userapply.html";
});

const jobDescription = document.querySelector(".job-description");

const jobContainer = document.querySelector(".jobs-container");

const url = "http://localhost:8080/api/advertisements/";

const getData = async () => {
  try {
    console.log("Fetching new data...");

    const response = await (
      await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    Object.entries(response).map(([key, value]) => {
      const jobCard = document.createElement("div");
      jobCard.setAttribute("class", "job-card");

      const bottomCardContainer = document.createElement("div");
      bottomCardContainer.setAttribute("class", "bottom-job-card");

      const readMore = document.createElement("button");
      readMore.textContent = "Read more";
      readMore.setAttribute("class", "read-more");

      //limit the size of the short description
      let shortDescription = "";
      if (value.description.length >= 200) {
        shortDescription = value.description.slice(0, 200) + "...";
      } else {
        shortDescription = value.description;
      }

      jobCard.innerHTML = `
      <div class="top-job-card">
      <div class="job-title-container">
      <img src="../src/images/job-icon.jpg" alt="job icon" class="job-icon">
      <h3 class="job-title">${value.title}</h3>
        </div>
        <div class="job-short-infos">
        <p>${shortDescription}</p>
        </div>
        </div>
        `;

      jobCard.appendChild(bottomCardContainer);
      bottomCardContainer.appendChild(readMore);
      jobContainer.appendChild(jobCard);

      const jobTitle = document.getElementById("jobTitle");
      const jobDetails = document.getElementById("jobDetails");
      const jobOverview = document.getElementById("projectOverview");
      const jobPlace = document.getElementById("place");
      const jobWage = document.getElementById("wage");
      const jobWorkingTime = document.getElementById("workingTime");

      //delete addvertisement

      //click on each read more
      readMore.addEventListener("click", () => {
        jobTitle.innerText = value.title;
        jobDetails.innerText = value["detail_role"];
        jobOverview.innerText = value.description;
        jobPlace.innerText = value.place;
        jobWage.innerText = value.wage;
        jobWorkingTime.innerText = value.workingtime;
      });

    });
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

getData();

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userSkills = document.getElementById("userSkills");

const logout = document.getElementById("logout");

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

    console.log(loggedInUser);

    const userLoginId = loggedInUser[0].id;
    //logout user
    logout.addEventListener("click", () => {
      const logoutUser = async () => {
        try {
          console.log("Deleting advertisement...");

          const response = await (
            await fetch(`http://localhost:8080/api/users/out/${userLoginId}`, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
            })
          ).json();
          window.location.replace("/client/pages/login.html");
        } catch (err) {
          console.log("Request failed: ", err.message);
        }
      };
      logoutUser();
    });

    //delete account
    deleteAccount.addEventListener("click", () => {
      const deleteUserAccount = async () => {
        try {
          console.log("Deleting account...");

          const response = await (
            await fetch(
              `http://localhost:8080/api/users/${loggedInUser[0].id}`,
              {
                method: "DELETE",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
              }
            )
          ).json();
          window.location.replace('/client/index.html');
        } catch (err) {
          console.log("Request failed: ", err.message);
        }
      };
      deleteUserAccount();
    });

    //print each skills separated with a comma (',')
    loggedInUser.map((elem) => {
      userName.innerText = elem.firstname + " " + elem.lastname;
      userEmail.innerText = elem.email;
      elem.skills.split(",").forEach((item) => {
        const userSkill = document.createElement("li");
        userSkill.textContent = item;
        userSkills.appendChild(userSkill);
      });
    });
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

getUsers();
