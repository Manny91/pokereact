import React, { useState, useEffect } from "react";
import {
  PokemonInfoDisplayer,
  PokemonMove
} from "../../services/pokemon.service";
import styled from "../../../../styled.components";

type State = {
  handleMoveNext: () => void;
  handleMovePrevious: () => void;
  move: PokemonMove;
};
export function PokemonMoveDisplayer({
  handleMoveNext,
  handleMovePrevious,
  move
}: State) {
  return (
    <>
      <MovesWrapper>
        <MoveInfoWrapper>
          {move && <MovementName>{move.name}</MovementName>}
          <MovementStatList>
            {move && (
              <MovementStat>Power : {move.power || "None"}</MovementStat>
            )}
            {move && <MovementStat>Accuracy : {move.accuracy}</MovementStat>}
            {move && <MovementStat>PP : {move.pp}</MovementStat>}
          </MovementStatList>
        </MoveInfoWrapper>
        <MoveTypeWrapper></MoveTypeWrapper>
      </MovesWrapper>

      <ButtonWrapper>
        <ButtonMove onClick={handleMovePrevious}>
          <i className="fas fa-caret-up" />
        </ButtonMove>
        <ButtonMove onClick={handleMoveNext}>
          <i className="fas fa-caret-down" />
        </ButtonMove>
      </ButtonWrapper>
    </>
  );
}
const MoveDetail = styled.div``;

const MovesWrapper = styled.section`
  background: linear-gradient(
    14deg,
    rgb(165, 205, 83) 60%,
    rgb(193, 217, 144) 65%
  );
  padding: 10px 20px;
  border-radius: 3px;
  font-family: "VT323";
  border: inset #879a65 3px;
  width: 100%;
`;

const MovementName = styled.h4`
  text-transform: capitalize;
  margin: 5px 0px;
`;

const MovementStatList = styled.ul`
  margin: 5px;
  border-top: 2px solid black;
  list-style-type: none;
  margin: 0px;
  padding: 0;
`;
const MovementStat = styled.li`
  font-weight: bold;
`;

const MoveInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const MoveTypeWrapper = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonMove = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: groove grey 3px;
  margin: 5px;
`;
