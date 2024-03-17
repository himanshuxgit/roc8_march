function checkAuthentication(): boolean {
  let isAuthenticated = true;

  if (typeof window !== "undefined") {
    isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  }

  return isAuthenticated;
}

export { checkAuthentication };
