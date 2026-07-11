export const getStudent = () => {
  const student = localStorage.getItem("student");
  return student ? JSON.parse(student) : null;
};
export const getToken = () => {
  return localStorage.getItem("token");
};
export const logout = () => {
  localStorage.removeItem("student");
  localStorage.removeItem("token");
  localStorage.removeItem("institute");
};