import React from "react";
import styled from 'styled-components'
import Title from "./Title"
import Explanation from "./Explanation"

const ImageContainer = props => {
  const { title, url, explanation, copyright } = props.image;
  
  const ImageContainer = styled.div`
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(91,152,196,1) 4%, rgba(0,212,255,1) 29%);
    width: 65%;
    padding: 1%;
    border: 5px solid #202020;
    border-radius: 5px;
    margin: 2% auto;
  `;
  
  return (
    <ImageContainer>
      <Title>{title}</Title>
      <div>
        <img src={url} alt="NASA API" />
        <Explanation>{explanation}</Explanation>
      </div>
      <p className="copyright">© {copyright}</p>
    </ImageContainer>
  );
};

export default ImageContainer;
