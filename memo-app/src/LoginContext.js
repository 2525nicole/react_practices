import { createContext, useContext, useState } from "react";

const LoginStatusContext = createContext();

export function useLoginStatus() {
  return useContext(LoginStatusContext);
}

export function LoginStatusProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginStatusContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginStatusContext.Provider>
  );
}
