import React from 'react';
import { Link } from 'react-router-dom';

import { Container, GlobalStyle } from './styles';

const Home = () => {
  return (
    <Container
      id="home-page-div"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: {
          opacity: 0,
        },
        show: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      }}
    >
      <GlobalStyle />
      <h1>This is the HOME page</h1>
      <p>Just a POC to see if we can use Vercel as partner</p>
      <Link to="/about">Go to About</Link>
    </Container>
  );
};

export default {
  component: Home,
};
