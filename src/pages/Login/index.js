import React, { useState } from 'react';

import styled from 'styled-components';

import api from '../../services/api';

export default function Login({ history }) {
	const [ email, setEmail ] = useState('');

 	async function handleSubmit(e) {
    	e.preventDefault();
    	const response = await api.post('/sessions', { email });
    	const { _id } = response.data;

    	// save _id logged in localStorage
    	localStorage.setItem('userid', _id);
    	history.push('/dashboard');
    }

    return ( 
    	<>
        <ContentTitle>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.</ContentTitle>
        <ContentForm onSubmit={ handleSubmit } >
        	<ContentLabel htmlFor="email">E-MAIL *</ContentLabel>
       		<ContentInput id = "email"
         		type = "email"
        		placeholder = "Seu melhor e-mail"
        		value = { email } onChange = { e => setEmail(e.target.value) }
        	/> 
       		<ContentButton type="submit" > Entrar </ContentButton>
       	</ContentForm> 
      </>        
    );
}

const ContentTitle = styled.p`
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 30px;
`;

const ContentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ContentLabel = styled.label`
  font-size: 14px;
  color: #4B4B4B;
  font-weight: bold;
  margin-bottom: 8px;  
`;

const ContentInput = styled.input`
  margin-bottom: 20px;
  border: 1px solid #DDD;
  border-radius: 2px;
  height: 45px;
  padding: 0 15px;
  font-size: 16px;
`;

const ContentButton = styled.button`
  border: 0;
  border-radius: 2px;
  width: 100%;
  height: 42px;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: bold;
  background: #F05A5B;
  color: #FFF;
  cursor: pointer;

  &:hover {
    background: #E14F50;
  }
`;