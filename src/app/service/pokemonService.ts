import { inject, Service } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class PokemonService {
  readonly #POKEMON_API_URL: string = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);

  getPokemonList(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(this.#POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.#POKEMON_API_URL}/${id}`;
    return this.#http.get<Pokemon>(url);
  }
}
