import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../service/pokemonService';
import { Pokemon } from '../../model/pokemon.model';
import { DatePipe } from '@angular/common';
import { appPokemonBorder } from '../../directive/app-pokemon-border.directive';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [DatePipe, appPokemonBorder, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``,
})
export class PokemonListComponent {
  readonly #pokemonService = inject(PokemonService);
  readonly searchTerm = signal('');
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: []
  });

  pokemonListFiltered = computed(() => {
    const pokemonList = this.pokemonList();

    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm().trim().toLowerCase()),
    );
  });
  readonly loading = computed(() => this.pokemonList().length === 0)

  protected size(pkm: Pokemon) {
    if (pkm.life <= 15) {
      return 'Petit';
    }
    if (pkm.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }
}
