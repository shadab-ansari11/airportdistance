import styled from "styled-components";

export const LabelTag = styled.p`
  display: block;
  font: normal normal 600 18px/25px Segoe UI;
  letter-spacing: 0px;
  color: #202020;
`;

export const LabelContainer = styled.div`
  width: "100%";
`;

export const InputField = styled.input`
  width: 100%;
  padding: 18px 15px;
  border: 1px solid #707070;
  font: normal normal 600 22px/30px Segoe UI;
  border-radius: 5px;
  margin-top: 8px;
  text-decoration: none;
  :focus {
    border: 0px solid none;
    outline: none;
  }
`;

export const DropdownContainer = styled.ul`
  background-color: #fff;
  border-radius: 5px;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: auto;
  margin-bottom: 10px;
  position: absolute;
  width: 72%;
  z-index: 1;
  @media screen and (min-width: 1200px) {
    width: 260px;
    z-index: 1;
  }
`;

export const Dropdown = styled.li`
  font: normal normal 600 22px/30px Segoe UI;
  cursor: pointer;
  list-style-type: none;
  margin-bottom: 5px;
  font-size: 18px;
`;

export const Dropdownlist = styled.p`
  padding: 10px;
  cursor: pointer;
  :not(:first-child) {
    border-top: 1px solid #ddd;
  }
`;
