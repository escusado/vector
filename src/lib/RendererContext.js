import React, { createContext, useState } from "react";
import { Text } from "drei";

export const RendererContext = createContext(null);

export const RendererContextProvider = ({ children }) => {
  const [rendererContent, setRendererContent] = useState(
    <Text
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
    >
      hello world!
    </Text>,
  );

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
