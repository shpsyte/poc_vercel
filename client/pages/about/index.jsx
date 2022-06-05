import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, GlobalStyle } from './styles';

const About = () => {
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
      <h1>This is the ABOUT page</h1>
      <p>Just a POC to see if we can use Vercel as partner</p>
      <Link to="/">Back to Home</Link>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

export default {
  component: connect(mapStateToProps, {})(About),
};
