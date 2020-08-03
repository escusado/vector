import React, { createContext, useState } from "react";
import { Text } from "drei";

export const RendererContext = createContext(null);

export const RendererContextProvider = ({ children }) => {
  const [rendererContent, setRendererContent] = useState(<></>);

  const rendererContext = {
    rendererContent,
    setRendererContent,
  };

  return (
    <RendererContext.Provider value={rendererContext}>
      {children}
    </RendererContext.Provider>
  );
};
