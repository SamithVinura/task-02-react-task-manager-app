import axios from "axios";

const baseUrl = "http://localhost:5000";

//user login
export const login = async (userName, password) => {
  try {
    const allusers = await axios.get(`${baseUrl}/users`);
    const userValid = allusers.data.filter(
      (user) => user?.userName === userName && user?.password === password
    );
    return userValid[0];
  } catch (error) {
    throw error;
  }
};
