import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }
`;

export const FullContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default GlobalStyle;
