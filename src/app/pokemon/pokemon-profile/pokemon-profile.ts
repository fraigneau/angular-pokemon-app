import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonResponse, PokemonService } from '../../service/pokemonService';
import { DatePipe } from '@angular/common';

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
