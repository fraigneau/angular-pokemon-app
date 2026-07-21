import { computed, inject, Service, Signal } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Service()
export class PokemonService implements pokemonResponseInterface {
  readonly #POKEMON_API_URL: string = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);
  readonly #route = inject(ActivatedRoute);

  readonly pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
  readonly pokemonResponse = toSignal(
    this.getPokemonById(this.pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error) => of({ value: undefined, error: error })),
    ),
  );

  readonly loading = computed(() => this.pokemonResponse() === undefined);
  readonly error = computed(() => this.pokemonResponse()?.error !== undefined);
  readonly obj = computed(() => this.pokemonResponse()?.value);

  getPokemonList(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(this.#POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.#POKEMON_API_URL}/${id}`;
    return this.#http.get<Pokemon>(url);
  }

  getPokemonTypeList(): String[] {
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }
}

type pokemonResult = { value: Pokemon; error: undefined } | { value: undefined; error: unknown };

export interface pokemonResponseInterface {
  readonly pokemonResponse: Signal<pokemonResult | undefined>;

  readonly loading: Signal<boolean>;
  readonly error: Signal<boolean>;
  readonly obj: Signal<Pokemon | undefined>;
}
