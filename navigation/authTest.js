// export const isAuthenticated = () => false;

import React, { useEffect, useState } from "react";
import firebase from 'firebase'
import config from '../config'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
      // config.auth().onAuthStateChanged(setCurrentUser);
      config.auth().onAuthStateChanged(setCurrentUser);
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          currentUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

// export const {currentUser} = useContext(AuthContext);