import React from 'react';

import styled from 'styled-components';

import GlobalStyles from './styles.js';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() {

  return (
    <Container>
      <GlobalStyles />
        <img src={logo} alt="AirCnC" />
        <Content>
          <Routes />        
        </Content>      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px auto 0;
  max-width: 450px;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  background: #FFF;
  color: #000;
  margin-top: 50px;
  border-radius: 4px;
  padding: 30px;
`;




export default App;
