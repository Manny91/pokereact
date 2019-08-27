import React from "react";
import styled from "../../../../styled.components";
import { ButtonCross } from "../button-cross/button-cross";

export interface PokemonSpriteControlsProps {
  handleRotate: () => void;
  handleShiny: () => void;
  handleChangeGender: () => void;
  rotation: string;
  gender: string;
  shiny: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTop: () => void;
  loading: boolean;
}

export const PokemonSpriteControls = ({
  handleRotate,
  handleShiny,
  handleChangeGender,
  rotation,
  gender,
  shiny,
  handleNext,
  handlePrevious,
  handleTop,
  loading
}: PokemonSpriteControlsProps) => {
  return (
    <ControlBar>
      <SpriteControlsWrapper>
        <Button
          onClick={() => handleRotate()}
          className={rotation === "back" ? "active" : ""}
        />
        <GenderButton
          onClick={() => handleChangeGender()}
          className={gender === "female" ? "active" : ""}
        />
        <ShinyButton
          onClick={() => handleShiny()}
          className={shiny ? "active" : ""}
        />
      </SpriteControlsWrapper>
      <ButtonCross loading={loading} handleNext={handleNext} handlePrevious={handlePrevious} handleTop={handleTop}/>
    </ControlBar>
  );
};

const ControlBar = styled.section`
  display: flex;
  justify-content: space-around;
  width: 420px;
  margin: 20px auto;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: groove grey 3px;
  color: black;
  &.active {
    border: inset 3px #d4b310;
  }
  cursor: pointer;
  background-color: #292929;
  &:hover {
    text-shadow: -1px -1px 0 #136a65;
    -webkit-transition: all 250ms linear;
    transition: all 100ms linear;
  }
`;

const CylinderButton = styled(Button)`
  height: 12px;
  border-radius: 10px;
`;
const ShinyButton = styled(CylinderButton)`
  border: groove #d4b310 3px;
  background-color: #fbc531;
`;
const GenderButton = styled(CylinderButton)`
  border: groove #8f88e2 3px;
  background-color: #a29bfe;
  &.active {
    border: inset #8f88e2 3px;
  }
`;
const SpriteControlsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;
