import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PokemonResponse } from '../../service/pokemonResponse';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  providers: [PokemonResponse],
  templateUrl: './pokemon-profile.html',
  styles: ``,
})
export class PokemonProfile {
  readonly pokemonService = inject(PokemonResponse);
}
