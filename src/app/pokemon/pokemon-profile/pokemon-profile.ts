import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.html',
  styles: ``,
})
export class PokemonProfile {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);
  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));

  readonly #pokemonResponse = toSignal(
    this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error) => of({ value: undefined, error: error })),
    ),
  );

  readonly loading = computed(() => this.#pokemonResponse === undefined);
  readonly error = computed(() => this.#pokemonResponse()?.error !== undefined);
  readonly pokemon = computed(() => this.#pokemonResponse()?.value);
}
