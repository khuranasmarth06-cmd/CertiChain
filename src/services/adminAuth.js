import API from "./api";
export const loginAdmin = async (loginData) => {
  const response = await API.post(
    "/admin/login",
    loginData
  );
  return response.data;
};