import styled from "../../../../styled.components";
import React from "react";
import PokedexTopSeparator from "../pokedex-top-separator/pokedex-top-separator";
import { PokedexPage } from "../../pokedex";
import { PokemonStatsDisplayer } from "../stats-displayer/stats-displayer";
import { PokemonTypeDisplayer } from "../type-displayer/type-displayer";
import { PokemonMoveDisplayer } from "../move-displayer/moves-displayer";

function PokedexRight({
  pageOpen,
  pokemon,
  handleMoveNext,
  handleMovePrevious,
  move
}: PokedexPage) {
  return (
    <PokedexRightPage className={pageOpen ? "page-open" : ""}>
      <TopWrapper>
        <PokedexTopSeparator orientation="RIGHT" />
      </TopWrapper>
      <Panel>
        <Content>
          <Container>
            <InfoDisplayer>
              <PokemonStatsDisplayer pokemon={pokemon} />
              <PokemonTypeDisplayer pokemon={pokemon} />
            </InfoDisplayer>
          </Container>
          <Container>
            <MoveDisplayer>
              <PokemonMoveDisplayer
                handleMoveNext={handleMoveNext}
                handleMovePrevious={handleMovePrevious}
                move={move}
              ></PokemonMoveDisplayer>
            </MoveDisplayer>
          </Container>
        </Content>
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
  transform: rotateY(-180deg);
`;
const TopWrapper = styled.div`
  width: 560px;
`;
const Content = styled.div`
  padding: 15px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const DisplayerWrapper = styled.div`
  padding: 5px;
  display: flex;
  width: 85%;
  border: groove #4e4e4e 3px;
`;
const InfoDisplayer = styled(DisplayerWrapper)`
    height: 160px;
    border-bottom: none;
}
`;

const MoveDisplayer = styled(DisplayerWrapper)`
  border-top: none;
  height: 100px;
`;
export default PokedexRight;
