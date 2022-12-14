import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/egov/api/user/sign-in",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "Success") {
      console.log("Logged in successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (e) {
    console.log(e.message);
    document.querySelector(".login--label").textContent = "Invalid Credentials";
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/egov/api/user/log-out",
    });
    if (res.data.status === "Success") {
      console.log("Logged out successfuly");
      location.reload(true);
      location.assign("/");
    }
  } catch (e) {
    console.log(e);
  }
};
