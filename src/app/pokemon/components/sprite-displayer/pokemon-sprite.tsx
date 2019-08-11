import React, { useEffect, useState } from "react";
import { PokemonSprite } from "../../services/pokemon-service";
import { PokemonSpriteControls } from "./pokemon-sprite-controls";
import styled from "../../../../styled.components";

interface PokemonSpriteProps {
  sprites: PokemonSprite;
}

export const PokemonSpriteDisplayer = ({ sprites }: PokemonSpriteProps) => {
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

  return (
    <>
      <Wrapper>
        <img src={selectedSprite} />
      </Wrapper>
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

const Wrapper = styled.div`
  height: 250px;
  width: 250px;
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
  img {
    width: 100%;
    image-rendering: pixelated;x
  }
`;
