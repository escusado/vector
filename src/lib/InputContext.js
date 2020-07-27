import React, { createContext, useState, useEffect } from "react";
import { useKeyUp, useKeyDown, useKeyCombo } from "react-keyboard-input-hook";

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
