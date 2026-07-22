import { computed, inject, Service } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { PokemonService } from './pokemonService';

@Service()
export class PokemonDetailState {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
  readonly #response = toSignal(
    this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error: unknown) => of({ value: undefined, error })),
    ),
  );

  readonly loading = computed(() => this.#response() === undefined);
  readonly error = computed(() => this.#response()?.error !== undefined);
  readonly pokemon = computed(() => this.#response()?.value);
}
