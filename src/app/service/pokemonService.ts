import { inject, Service } from '@angular/core';
import { PokemonList } from '../model/pokemon-list';
import { Pokemon } from '../model/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class PokemonService {
  readonly #PKM_API_URL: string = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);

  getPokemonList(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(this.#PKM_API_URL);
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
