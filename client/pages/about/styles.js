import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e2e8f0;
    h1 {
      color: #3182ce;
    }
    p {
      color: #5a6e81;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 16rem;

  p {
    font-size: 1.6rem;
    color: #code;
  }
`;
