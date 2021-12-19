import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background: blueviolet;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin: 0 1em;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

`