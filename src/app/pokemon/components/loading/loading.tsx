import React from "react";
import styled, { keyframes } from "../../../../styled.components";

const loadingAnimation = keyframes`
    0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
`;
const LoadingWrapper = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0px;
`;
const LoadingDot = styled.li`
  width: 7px;
  height: 7px;
  background-color: black;
  border-radius: 2px;
  margin: 0px 2px;
  list-style-type: none;
  -webkit-animation: ${loadingAnimation} 1s infinite ease-in-out both;
  animation: ${loadingAnimation} 1s infinite ease-in-out both;
`;

export function Loading() {
  return (
    <LoadingWrapper>
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
    </LoadingWrapper>
  );
}
