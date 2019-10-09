import React, { useState, useMemo } from 'react';

import styled from 'styled-components';

import camera from '../../assets/camera.svg';

import api from '../../services/api.js';

export default function New({ history }) {

    const [ company, setCompany ] = useState('');
    const [ tecnology, setTecnology ] = useState([]);
    const [ price, setPrice ] = useState('');
    const [ thumbnail, setThumbnail ] = useState(null);

    const preview = useMemo( () => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    );
     
    async function handleSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();

        const userid = localStorage.getItem('userid');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', tecnology);
        data.append('price', price);

        await api.post('/spots', data, { 
            headers: { userid } 
        });   

        history.push('/dashboard');
    }

    return (
    <>
        <ContentForm onSubmit={handleSubmit} >
            <Thumbnail 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <Input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                <img src={camera} alt="Company" />
            </Thumbnail>

            <ContentLabel htmlFor="company">Empresa *</ContentLabel>
            <ContentInput 
                id="company"
                type="text"
                placeholder="Sua empresa incrível"                
                value={company} 
                onChange={e => setCompany(e.target.value)}
            />

            <ContentLabel htmlFor="tecnology">Tecnologias * <ContentSpan>( separadas por vírgula )</ContentSpan></ContentLabel>
            <ContentInput 
                id="tecnology"
                type="text"
                placeholder="Quais tecnologias usam?"                
                value={tecnology} 
                onChange={e => setTecnology(e.target.value)}
            />

            <ContentLabel htmlFor="price">Valor da diária * 
                <ContentSpan>( em branco para GRATUITO )</ContentSpan>
            </ContentLabel>

            <ContentInput 
                id="price"
                type="number"
                placeholder="Valor cobrado por dia"                
                value={price} 
                onChange={e => setPrice(e.target.value)}
            />

            <button type="submit" className="btn">
                Cadastrar
            </button>

        </ContentForm>
    </>
    );
}

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

const ContentSpan = styled.span`
    font-weight: normal;
    color: #999;
    font-size: 12px;
`;

const Thumbnail = styled.label`
    margin-bottom: 20px;
    border: 1px dashed #DDD;
    background-size: cover;
    cursor: pointer;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.has-thumbnail {
        border: none;

        & img {
            display: none;
        }
    }


`;

const Input = styled.input`
    display: none;
`;