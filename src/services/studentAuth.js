import API from "./api";
export const signupStudent = async (studentData) => {
  const response = await API.post(
    "/student/signup",
    studentData
  );
  return response.data;
};
export const loginStudent = async (loginData) => {
  const response = await API.post(
    "/student/login",
    loginData
  );
  return response.data;
};