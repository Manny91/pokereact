import { ClientHttp } from "./http-client";

interface PokemonSprite {
  back_default?: string;
  front_default?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprite;
  weight: number;
  height: number;
}

export class PokemonService extends ClientHttp {
  async getPokemon(pokemonNo: number): Promise<Pokemon> {
    const res = await this.get(`/pokemon/${pokemonNo}`);
    return res.json();
  }
}
