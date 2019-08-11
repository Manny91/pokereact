import React from "react";
import styled from "../../../../styled.components";

export interface PokemonSpriteControlsProps {
  handleRotate: () => void;
  handleShiny: () => void;
  handleChangeGender: () => void;
  rotation: string;
  gender: string;
  shiny: boolean;
}

export const PokemonSpriteControls = ({
  handleRotate,
  handleShiny,
  handleChangeGender,
  rotation,
  gender,
  shiny
}: PokemonSpriteControlsProps) => {
  return (
    <ControlBar>
      <Button
        onClick={() => handleChangeGender()}
        className={gender === "female" ? "active" : ""}
      >
        <i className={`fa  ${gender === "default" ? "fa-mars" : "fa-venus"}`} />
      </Button>
      <Button onClick={() => handleShiny()} className={shiny ? "active" : ""}>
        Shiny
      </Button>
      <Button
        onClick={() => handleRotate()}
        className={rotation === "back" ? "active" : ""}
      >
        <i
          className={`fas  ${
            rotation === "front" ? "fa-undo" : "fa-redo active"
          }`}
        />
      </Button>
    </ControlBar>
  );
};

const ControlBar = styled.section`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: groove grey 3px;
  color: black;
  &.active {
    border-color: #d4b310;
  }
  cursor: pointer;
`;
