import React, { createContext, useState } from "react";
import { useKeyDown } from "react-keyboard-input-hook";

export const InputContext = createContext(null);

export const InputContextProvider = ({ children }) => {
  const [screenContext, setScreenContext] = useState("game");
  const [currentInput, setCurrentInput] = useState({
    throttle: 0,
  });

  const { keyName } = useKeyDown();

  const inputContext = {
    screenContext,
    setScreenContext,
    currentInput,
    setCurrentInput,
    keyName,
  };

  return (
    <InputContext.Provider value={inputContext}>
      {children}
    </InputContext.Provider>
  );
};
