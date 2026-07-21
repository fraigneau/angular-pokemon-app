import { computed, inject, Service, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from './pokemonService';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';

@Service()
export class PokemonResponse implements pokemonResponseInterface {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  readonly pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
  readonly pokemonResponse = toSignal(
    this.#pokemonService.getPokemonById(this.pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error) => of({ value: undefined, error: error })),
    ),
  );

  readonly loading = computed(() => this.pokemonResponse() === undefined);
  readonly error = computed(() => this.pokemonResponse()?.error !== undefined);
  readonly pokemon = computed(() => this.pokemonResponse()?.value);
}

type pokemonResult = { value: Pokemon; error: undefined } | { value: undefined; error: unknown };

export interface pokemonResponseInterface {
  readonly pokemonResponse: Signal<pokemonResult | undefined>;

  readonly loading: Signal<boolean>;
  readonly error: Signal<boolean>;
  readonly pokemon: Signal<Pokemon | undefined>;
}
