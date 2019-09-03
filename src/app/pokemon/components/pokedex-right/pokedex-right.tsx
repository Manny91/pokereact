import styled from "../../../../styled.components";
import React, { ReactNode } from "react";
import PokedexTopSeparator from "../pokedex-top-separator/pokedex-top-separator";
import { PokedexPage } from "../../pokedex";
import { Pokemon, PokemonStat } from "../../services/pokemon.service";


function PokedexRight({ pageOpen, pokemon }: PokedexPage) {
  return (
    <PokedexRightPage className={pageOpen ? "page-open" : ""}>
      <TopWrapper>
        <PokedexTopSeparator orientation="RIGHT" />
      </TopWrapper>
      <Panel >
          <Container>
            <PokemonStatsDisplayer pokemon={pokemon} />
            <PokemonTypeDisplayer pokemon={pokemon}/>
          </Container>

      </Panel>
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
  height: 500px;
  width: 540px;
  background-color: #e61515;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 10px double;
  border-top: none;
  position: relative;
  transform: rotateY(-180deg)
`;
const TopWrapper = styled.div`
  width: 560px;
`;

const Container = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-around;
`;
export default PokedexRight;

interface PokemonInfoDisplayer {
    pokemon: Pokemon;
};

function statToString({stat, base_stat}: PokemonStat): string {
    if(stat) {
        const maxLengthString = 20;
        const statName = stat.name;
        const pokeStatStringLength = statName.length + base_stat.toString().length;
        return statName+new Array(maxLengthString - pokeStatStringLength).fill('.').join("")+base_stat;
    }
    return "";
}

function PokemonStatsDisplayer({pokemon}: PokemonInfoDisplayer) {

    return pokemon && pokemon.stats ? (
        <StatsWrapper>
            {pokemon.stats.map((stat, i) => {
                return <PokeStatContainer>{statToString(stat)}</PokeStatContainer>
            })}
        </StatsWrapper>
    ) : null
}
const StatsWrapper = styled.section`
    background: linear-gradient(14deg, rgb(165, 205, 83) 60%, rgb(193, 217, 144) 65%);
    padding: 15px 20px;
    border-radius: 3px;
    font-family: "VT323";
    border: inset #879a65 3px;
`

const PokeStatContainer = styled.p`
    margin: 5px 0px;
    font-weight: bold;
    text-transform: capitalize;
`
const PokemonTypeBanner = styled.div`
    width: 150px;
    height: 35px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    text-transform: uppercase;
    text-align: center;
    margin: 7px 0px;
    border: groove #757575 3px;
    justify-content: center;
    display: flex;
    align-items: center;
    font-family: "VT323";
    font-size: 19px;
    font-weight:bold;
    &.normal {
        background-color: #bfbfbf;
    }
    &.fighting {
        background-color: #d87c58;
    }
    &.flying {
        background-color: #999ade;
    }
    &.poison {
        background-color: #925192;
    }
    &.ground {
        background-color: #dea761;
    }
    &.rock {
        background-color: #897864;
    }
    &.bug {
        background-color: #b1c967;
    }
    &.ghost {
        background-color: #c195dc;
    }
    &.steel {
        background-color: #49769c;
    }
    &.fire {
        background-color: #cf1414;
    }
    &.water {
        background-color: #1689de;
    }
    &.grass {
        background-color: #47a047;
    }
    &.electric {
        background-color: #e6b700;
    }
    &.psychic {
        background-color: #fa43b8;
    }
    &.ice {
        background-color: #98c3de;
    }
    &.dragon {
        background-color: #89315d;
    }
    &.dark {
        background-color: #282433;
    }
    &.fairy {
        background-color: #dca0ce;
    }
    &.unknown {
        background-color: #545454;
    }
    &.shadow {
        background-color: #364163;
    }

`;


function PokemonTypeDisplayer({pokemon}: PokemonInfoDisplayer) {
    return pokemon && pokemon.types ? (
        <div>
        {pokemon.types.map((pokeType, index) => <PokemonTypeBanner className={pokeType.type.name} key={index}>{pokeType.type.name}</PokemonTypeBanner>)}
        </div>
    ) : null
}
