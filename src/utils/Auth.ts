function checkAuthentication(): boolean {
  let isAuthenticated = true;

  if (typeof window !== "undefined") {
    isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
    console.log(
      "isAuthenticatedisAuthenticatedisAuthenticatedisAuthenticated",
      isAuthenticated,
    );
  }

  return isAuthenticated;
}

export { checkAuthentication };
