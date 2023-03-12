import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [ user, setUser ] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser? JSON.parse(storedUser):'';
    });

    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser('');
  }
  const valueToShare = {
   user, login, logout
  };
    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;