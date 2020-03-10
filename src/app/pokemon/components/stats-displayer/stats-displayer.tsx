import React from "react";
import styled from "../../../../styled.components";
import {
  PokemonInfoDisplayer,
  PokemonStat
} from "../../services/pokemon.service";

export function PokemonStatsDisplayer({ pokemon }: PokemonInfoDisplayer) {
  return pokemon && pokemon.stats ? (
    <StatsWrapper>
      {pokemon.stats.map((stat, i) => {
        return (
          <PokeStatContainer key={i}>{statToString(stat)}</PokeStatContainer>
        );
      })}
    </StatsWrapper>
  ) : null;
}

function statToString({ stat, base_stat }: PokemonStat): string {
  if (stat) {
    const maxLengthString = 20;
    const statName = stat.name;
    const pokeStatStringLength = statName.length + base_stat.toString().length;
    return (
      statName +
      new Array(maxLengthString - pokeStatStringLength).fill(".").join("") +
      base_stat
    );
  }
  return "";
}

const StatsWrapper = styled.section`
  background: linear-gradient(
    14deg,
    rgb(165, 205, 83) 60%,
    rgb(193, 217, 144) 65%
  );
  padding: 15px 20px;
  border-radius: 3px;
  font-family: "VT323";
  border: inset #879a65 3px;
  width: 100%;
`;

const PokeStatContainer = styled.p`
  margin: 5px 0px;
  font-weight: bold;
  text-transform: capitalize;
`;
