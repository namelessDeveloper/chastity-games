import styled from "styled-components";

export const NAVIGATION_HEIGHT = 70

export const Container = styled.div`
  width: 100%;
  height: ${NAVIGATION_HEIGHT}px;
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