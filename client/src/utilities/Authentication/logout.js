import userAxios from "../userAxios";

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {error: null, status: 200}
  } catch (error) {
    return { error };
  }
};
