import axios from "axios";
export const addUlb = async (formData) => {
  let data = {};
  formData.forEach((val, key) => (data[key] = val));
  try {
    const res = await axios({
      url: "/egov/api/ulb/",
      method: "POST",
      data,
    });

    if (res.data.status === "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    }
  } catch (e) {
    console.log(e);
  }
};
