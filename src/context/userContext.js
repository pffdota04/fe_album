import React, { createContext, useState } from "react";
const userContext = createContext();
// Provide Context
export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    _id: null,
    email: null,
    name: null,
    sharedAlbums: null,
    sharedImages: null,
    token: null,
  });
  return (
    <userContext.Provider value={{ state: state, setState: setState }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
