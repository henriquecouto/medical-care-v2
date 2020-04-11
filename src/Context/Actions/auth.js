export const checkLogin = async () => {
  try {
    const user = JSON.parse(await localStorage.getItem("auth"));
    return user;
  } catch (error) {
    logout();
  }
};

export const login = (setState) => async (user) => {
  try {
    if (user) {
      await localStorage.setItem("auth", JSON.stringify(user));
      setState((prev) => ({
        ...prev,
        user: { ...user, status: true },
      }));
    }
  } catch (error) {
    alert("Ocorreu um erro ao fazer login!");
  }
};

export const logout = async () => {
  try {
    await localStorage.removeItem("auth");
    window.location.reload();
  } catch (error) {
    alert("Ocorreu um erro ao fazer logout!");
  }
};
