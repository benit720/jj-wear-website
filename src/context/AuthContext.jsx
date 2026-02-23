import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, location = '') => {
    // Mock login logic
    if (email === 'admin@jjwear.com' && password === 'admin') {
      setUser({ email, name: 'Juste & Justin', isAdmin: true, location: 'Headquarters' });
      return true;
    }
    // For normal users, simulate registration or login with location
    setUser({ email, name: 'Customer', isAdmin: false, location });
    return true;
  };

  const logout = () => {

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
