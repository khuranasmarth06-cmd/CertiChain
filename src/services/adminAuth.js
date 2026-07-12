import API from "./api";
export const loginAdmin = async (loginData) => {
  const response = await API.post(
    "/admin/login",
    loginData
  );
  return response.data;
};
export const getPendingInstitutes = async () => {
  const response = await API.get(
    "/admin/pending-institutes"
  );

  return response.data.institutes;
};