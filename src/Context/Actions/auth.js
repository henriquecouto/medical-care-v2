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
    await localStorage.setItem("auth", JSON.stringify(user));
    setState((prev) => ({
      ...prev,
      user: { ...user, status: true },
      listening: true,
    }));
  } catch (error) {
    alert("Ocorreu um erro ao fazer login!");
  }
};

export const logout = (setState) => async () => {
  try {
    await localStorage.removeItem("auth");
    setState((prev) => ({
      ...prev,
      user: { status: false },
      listening: false,
    }));
  } catch (error) {
    alert("Ocorreu um erro ao fazer logout!");
  }
};
