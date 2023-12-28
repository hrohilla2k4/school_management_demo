import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialSchoolId = Cookies.get('schoolId') || '';
  const initialSchoolPassword = Cookies.get('schoolPassword') || '';

  const [schoolId, setSchoolId] = useState(initialSchoolId);
  const [schoolPassword, setSchoolPassword] = useState(initialSchoolPassword);

  // Update the cookies whenever schoolId or schoolPassword changes
  useEffect(() => {
    Cookies.set('schoolId', schoolId, { expires: 7 }); // You can specify an expiration date
    Cookies.set('schoolPassword', schoolPassword, { expires: 7 }); //cookies expires after 7 days
  }, [schoolId, schoolPassword]);

  return (
    <AuthContext.Provider value={{ schoolId, setSchoolId, schoolPassword, setSchoolPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
