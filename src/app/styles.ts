import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  body {
    color: white;
    background: #18181A;
  }
  button {
    display: block;
    background: blueviolet;
    border: none;
    border-radius: .3em;
    padding: .5em;
    margin: .2em;
    color: black;
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
    &:disabled {
      filter: brightness(0.5);
    }
  }
`

export default GlobalStyles;