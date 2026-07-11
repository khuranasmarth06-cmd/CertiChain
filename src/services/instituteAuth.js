import API from "./api";
export const signupInstitute = async (instituteData) => {
  const response = await API.post(
    "/institute/signup",
    instituteData
  );
  return response.data;
};
export const loginInstitute = async (loginData) => {
  const response = await API.post(
    "/institute/login",
    loginData
  );
  return response.data;
};