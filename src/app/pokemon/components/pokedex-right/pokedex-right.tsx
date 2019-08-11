import styled from "../../../../styled.components";
import React from "react";
import PokedexTopSeparator from "../pokedex-top-separator/pokedex-top-separator";
import { PokedexPage } from "../../pokedex";

function PokedexRight({ pageOpen }: PokedexPage) {
  return (
    <PokedexRightPage className={pageOpen ? "page-open" : ""}>
      <TopWrapper>
        <PokedexTopSeparator orientation="RIGHT" />
      </TopWrapper>
      <Panel />
    </PokedexRightPage>
  );
}

const PokedexRightPage = styled.div`
  position: absolute;
  left: 40px;
  bottom: 10px;
  visibility: hidden;
  margin-top: 150px;
  width: 550px;
  border-radius: 15px;
  border-top-left-radius: 0px;
  border-right: none;
  transform-origin: right;
  transition: all 0.5s ease-in-out;
  &.page-open {
    -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */
    animation-name: example;
    animation-duration: 0.5s;
    visibility: visible;
    transform: perspective(1500px) translateZ(0px) translateX(0px)
      translateY(0px) rotateY(-180deg);
    animation-name: opening;
    @keyframes opening {
      0% {
        left: -100px;
      }
      100% {
        left: 40px;
      }
    }
  }
`;

const Panel = styled.div`
  height: 450px;
  width: 540px;
  background-color: #e61515;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 10px double;
  border-top: none;
  position: relative;
`;
const TopWrapper = styled.div`
  width: 560px;
`;
export default PokedexRight;
