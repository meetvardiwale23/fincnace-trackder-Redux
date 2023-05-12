import React, { createContext, useContext, useState } from "react";

export const GlobalData = createContext(undefined);

export const ProviderFunction = ({ children }) => {
  const [getData, setData] = useState([]);
  //console.log("get data of context", getData);
  return (
    <GlobalData.Provider value={{ getData, setData }}>
      {children}
    </GlobalData.Provider>
  );
};
