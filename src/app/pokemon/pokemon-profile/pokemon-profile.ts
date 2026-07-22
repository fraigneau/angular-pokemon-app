import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PokemonDetailState } from '../../service/pokemon-detail-state';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  providers: [PokemonDetailState],
  templateUrl: './pokemon-profile.html',
  styles: ``,
})
export class PokemonProfile {
  readonly pokemonDetailState = inject(PokemonDetailState);
}
