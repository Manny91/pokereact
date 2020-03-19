import React, { useEffect, useState } from "react";
import { PokemonSprite } from "../../services/pokemon.service";
import { PokemonSpriteControls } from "./pokemon-sprite-controls";
import styled from "../../../../styled.components";
import { Loading, LoadingWrapper } from "../loading/loading";

interface PokemonSpriteProps {
  sprites: PokemonSprite;
  name?: string;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTop: () => void;
  loading: boolean;
}

export const PokemonSpriteDisplayer = ({
  sprites,
  name,
  loading,
  handleNext,
  handlePrevious,
  handleTop
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
  }, [rotation, shiny, gender, sprites]);
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
        <Wrapper>
          {loading && <Loading />}
          {!loading && (
            <>
              <PokemonName>{name}</PokemonName>
              <PokemonImage
                className={loading ? "hide" : "show"}
                src={selectedSprite}
                onLoadStart={showLoaderImage}
              />
            </>
          )}
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
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleTop={handleTop}
        loading={loading}
      />
    </>
  );

  function changeSelectedSprite(strToSprite: string) {
    if (sprites) {
      const spriteEntries = Object.keys(sprites);
      const spriteValues = Object.values(sprites);
      if (spriteValues[spriteEntries.indexOf(strToSprite)]) {
        setSelectedSprite(spriteValues[spriteEntries.indexOf(strToSprite)]);
      }
    }
  }
};
const PokemonName = styled.h1`
  font-size: 22px;
  font-family: "VT323";
  text-align: center;
  text-transform: capitalize;
  position: absolute;
  top: 0px;
  width: 100%;
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
  position: relative;
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
  display: flex;
  justify-content: center;
  img {
    margin-top: 15px;
    width: 150px;
    image-rendering: pixelated;
  }

  ${LoadingWrapper} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PokemonImage = styled.img`
  &.hide {
    visibility: hidden;
  }
`;
