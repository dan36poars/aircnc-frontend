import { createGlobalStyle } from 'styled-components';
import backgroundImg from './assets/background.jpg';

export default createGlobalStyle` 
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #9E1F9E url(${backgroundImg}) no-repeat;
        background-size: cover;
        -webkit-font-smoothing: antialiased !important;
        color: #FFF;
    }

    html, body, #root {
        min-height: 100%;
    }

    body, input, button {
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    .btn {
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
    }

  
`;
