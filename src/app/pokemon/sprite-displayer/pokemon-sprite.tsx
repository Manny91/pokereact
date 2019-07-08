import React, { useEffect, useState } from "react";
import { PokemonSprite } from "../services/pokemon-service";
import { PokemonSpriteControls } from "./pokemon-sprite-controls";

interface PokemonSpriteProps {
  sprites: PokemonSprite;
}

export const PokemonSpriteDisplayer = ({ sprites }: PokemonSpriteProps) => {
  const [selectedSprite, setSelectedSprite] = useState(sprites.front_default);
  const [gender, setGender] = useState("default");
  const [rotation, setRotation] = useState("front");
  const [shiny, setShiny] = useState(false);

  function handleChangeGender() {
    if (!shiny) {
      if (gender === "default") {
        setGender("female");
      } else {
        setGender("default");
      }
      const stringToSprite = `${rotation}_${gender}`;

      changeSelectedSprite(stringToSprite);
    }
  }
  function handleRotate() {
    console.log("rotation", rotation, "shiny", shiny, "gender", gender);
    if (rotation === "back") {
      setRotation("front");
    } else {
      setRotation("back");
    }
    console.log("rotation", rotation, "shiny", shiny, "gender", gender);
    const stringToSprite = shiny
      ? `${rotation}_shiny`
      : `${rotation}_${gender}`;
    changeSelectedSprite(stringToSprite);
  }
  function handleShiny() {
    console.log(shiny);
    setShiny(!shiny);
    console.log(shiny);
    const stringToSprite = shiny
      ? `${rotation}_shiny`
      : `${rotation}_${gender}`;
    changeSelectedSprite(stringToSprite);
  }
  return (
    <div>
      <img src={selectedSprite} />
      <PokemonSpriteControls
        gender={gender}
        rotation={rotation}
        shiny={shiny}
        handleChangeGender={handleChangeGender}
        handleRotate={handleRotate}
        handleShiny={handleShiny}
      />
    </div>
  );

  function changeSelectedSprite(strToSprite: string) {
    const spriteEntries = Object.keys(sprites);
    const spriteValues = Object.values(sprites);
    console.log("str", strToSprite);
    if (spriteValues[spriteEntries.indexOf(strToSprite)]) {
      setSelectedSprite(spriteValues[spriteEntries.indexOf(strToSprite)]);
    }
  }
};
