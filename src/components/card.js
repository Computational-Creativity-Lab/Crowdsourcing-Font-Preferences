import styled from "styled-components";
import React from "react";

const CardContainer = styled.div`
  padding: 20px;
  justify-items: start;
  height: 100%;
  background: #03091a;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    transform: scale(1.01);
  }
`;

const FontName = styled.p`
  color: white;
  font-size: 14px;
  display: block;
  position: absolute;
  top: 20px;
`;

const Pengram = styled.p`
  font-size: 48px;
  color: white;
  display: block;
  grid-column: ${(props) => props.col};
  text-align: center;
  padding: 0px 20px;
`;

export default function Card(props) {
  return (
    <CardContainer>
      <FontName>Roboto</FontName>
      <Pengram>Sphinx of black quartz, judge my vow.</Pengram>
    </CardContainer>
  );
}
