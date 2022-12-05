import axios from "axios";

export const signUp = async (name, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/egov/api/user/sign-up",
      data: {
        name,
        email,
        password,
      },
    });

    if (res.data.status === "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (e) {
    console.log(e);
    document.querySelector(".sign--up--label").textContent = "User Already exists";
  }
};
