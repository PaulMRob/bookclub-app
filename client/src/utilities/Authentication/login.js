import userAxios from "../userAxios";

export const login = async (credentials) => {
  try {
    const response = await userAxios.post("auth/login", credentials);
    const { user, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  } catch (error) {
    return { error };
  }
};
