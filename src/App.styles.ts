import styled from "styled-components";
import img from './assets/img/loading.gif';

export const Container = styled.div`
    background-color: #3A3B9C;
    color: #FFF;
    min-height: 100vh;
`;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 0;
`;

export const TextBox = styled.div`
    padding: 30px 0;
    background-color: #212529;
    border-bottom: 3px solid #000;
    box-shadow: 0px 2px #111;
    border-radius: 0 0 20px 20px;
`;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
    font-size: 60px;
    color: #ffffff;
    font-family: "Arial Black", Gadget, sans-serif;
    text-shadow: 0px 0px 0 rgb(237,237,237),
                 1px 1px 0 rgb(219,219,219),
                 2px 2px 0 rgb(201,201,201),
                 3px 3px 0 rgb(183,183,183),
                 4px 4px 0 rgb(165,165,165),
                 5px 5px  0 rgb(147,147,147),
                 6px 6px 5px rgba(0,0,0,0.6),
                 6px 6px 1px rgba(0,0,0,0.5),
                 0px 0px 5px rgba(0,0,0,.2);
`;

export const LoadingInfo = styled.div`
    text-align: center;
    font-weight: bold;
    color: #212529;

    .gif {
        background-image: url(${img});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: 80px;
    }
`;