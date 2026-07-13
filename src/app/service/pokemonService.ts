import { Service } from '@angular/core';
import { PokemonList } from '../model/pokemon-list';
import { Pokemon } from '../model/pokemon.model';

@Service()
export class PokemonService {
  getPokemonList(): Pokemon[] {
    return PokemonList;
  }

  getPokemonById(id: number): Pokemon {
    const pokemon = PokemonList.find((p) => p.id === id);
    if (!pokemon) {
      throw new Error('Pokemon not found with id ${id}.');
    }
    return pokemon;
  }

  getPokemonTypeList(): String[] {
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }
}
