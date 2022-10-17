import styled from "styled-components";

export const Container = styled.div`
  width: "100%";
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderName = styled.h2`
  font: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const TextfieldContainer = styled.div`
  display: block;
  @media screen and (min-width: 1200px) {
    display: flex;
  flex-direction: row;
  justify-content: space-around;
  }
 
`;

export const InputFieldMainContainer = styled.div`
width: 80%;
margin: 0 auto;
padding-bottom: 25px;
  @media screen and (min-width: 1200px) {
    padding: 0px 0px;
  margin: 0 auto;
  width: 60%;
  margin-bottom: 35px;
  }
`;

export const Div = styled.div`
 @media screen and (min-width: 1200px){
    
  }
 `;

export const Button = styled.button`
  padding: 20px 30px;
  border-radius: 5px;
  border: none 0px;
  cursor: pointer;
  background-color: #1f8dd6;
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
`;

export const NauticalCal = styled.p`
  display: block;
  font: normal normal 600 24px/25px Segoe UI;
  letter-spacing: 0px;
  color: #202020;
`;
