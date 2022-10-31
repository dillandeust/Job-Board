const url = "http://localhost:8080/api/users/";
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
    console.log(response);

    const loggedInUser = response.filter((user) => user.islogedin === 1);

    console.log(loggedInUser[0]['Name_of_company']);

    if (loggedInUser[0]['Name_of_company'] === '') {
        window.location.replace('/client/pages/userhome.html');
    } else {
        window.location.replace('/client/pages/home.html');
    }

  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

setTimeout(getData, 2000);