import React, { useEffect, useState } from "react";
import { PokemonSprite } from "../../services/pokemon-service";
import { PokemonSpriteControls } from "./pokemon-sprite-controls";
import styled from "../../../../styled.components";

interface PokemonSpriteProps {
  sprites: PokemonSprite;
  name: string;
}

export const PokemonSpriteDisplayer = ({
  sprites,
  name
}: PokemonSpriteProps) => {
  const [selectedSprite, setSelectedSprite] = useState(sprites.front_default);
  const [gender, setGender] = useState("default");
  const [rotation, setRotation] = useState("front");
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    setRotation(rotation);
    const stringToSprite = shiny
      ? `${rotation}_shiny`
      : `${rotation}_${gender}`;
    changeSelectedSprite(stringToSprite);
  }, [rotation, shiny, gender]);
  function handleChangeGender() {
    if (!shiny) {
      if (gender === "default") {
        setGender("female");
      } else {
        setGender("default");
      }
    }
  }
  function handleRotate() {
    if (rotation === "back") {
      setRotation("front");
    } else {
      setRotation("back");
    }
  }
  function handleShiny() {
    setShiny(!shiny);
  }

  function showLoaderImage() {
    console.log("loading...");
  }

  return (
    <>
      <Screen>
        <TopButtonsContainer />
        <Wrapper className={selectedSprite ? "on" : "off"}>
          <img src={selectedSprite} onLoad={showLoaderImage} />
          <PokemonName name={name} />
        </Wrapper>
        <BottomButtonsContainer />
      </Screen>
      <PokemonSpriteControls
        gender={gender}
        rotation={rotation}
        shiny={shiny}
        handleChangeGender={handleChangeGender}
        handleRotate={handleRotate}
        handleShiny={handleShiny}
      />
    </>
  );

  function changeSelectedSprite(strToSprite: string) {
    const spriteEntries = Object.keys(sprites);
    const spriteValues = Object.values(sprites);
    if (spriteValues[spriteEntries.indexOf(strToSprite)]) {
      setSelectedSprite(spriteValues[spriteEntries.indexOf(strToSprite)]);
    }
  }
};
const PokemonName = styled.h1<{ name: String }>`
  margin-top: -55px;
  font-size: 22px;
`;
const TopButtonsWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35px;
`;
const SmallButtons = styled.div`
    background-color: #e61515
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: 1px solid;
`;
function TopButtonsContainer() {
  return (
    <TopButtonsWrapper>
      <ButtonsContainer>
        <SmallButtons />
        <SmallButtons />
      </ButtonsContainer>
    </TopButtonsWrapper>
  );
}
const BottomButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
`;
const Speaker = styled.div`
    height: 10px;
    width: 25px;
    border-top: 2px solid;
    border-bottom 2px solid;
    position:relative;
    &:after {
        content: '';
        width: 25px;
        border-top: 2px solid;
        border-bottom: 2px solid;
        position: absolute;
        height: 2px;
        bottom: 2px;
    }
`;
function BottomButtonsContainer() {
  return (
    <BottomButtonsWrapper>
      <SmallButtons />
      <Speaker />
    </BottomButtonsWrapper>
  );
}

const Screen = styled.div`
  height: 250px;
  width: 320px;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: #dedede;
  border-radius: 8px;
  border: inset 2px black;
`;

const Wrapper = styled.div`
  margin: auto;
  height: 180px;
  width: 200px;
  background: linear-gradient(
    15deg,
    #cad5b5 64%,
    #dde2d4 70%,
    #dde2d4 81%,
    #fff 86%,
    #dde2d4 89%,
    #dde2d4 100%
  );
  border: inset #9aa28b 3px;
  border-radius: 8px;
  img {
    width: 100%;
    image-rendering: pixelated;
  }
  &.off {
    background-color: black;
  }
`;
