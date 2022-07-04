import { createContext, useState } from 'react';
// const AuthContext = React.createContext();

// sukuriam context
// argumentai tik autocompletina
export const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(null);
  // infered value / calculated value
  const isUserLoggedIn = !!token;

  function login(userToken) {
    setToken(userToken);
  }
  function logout() {
    setToken(null);
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
