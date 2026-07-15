import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import { appPokemonBorder } from '../../directive/app-pokemon-border.directive';

@Component({
  selector: 'app-pokemon-profile',
  imports: [appPokemonBorder],
  templateUrl: './pokemon-profile.html',
  styles: ``,
})
export class PokemonProfile {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));

  readonly pokemon = signal(this.#pokemonService.getPokemonById(this.#pokemonId));
}
