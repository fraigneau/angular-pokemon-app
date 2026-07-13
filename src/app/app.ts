import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Pokemon } from './model/pokemon.model';
import { appPokemonBorder } from './directive/app-pokemon-border.directive';
import { PokemonService } from './service/pokemonService';

@Component({
  selector: 'app-root',
  imports: [appPokemonBorder, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly #pokemonService = inject(PokemonService);
  readonly searchTerm = signal('');
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());

  pokemonListFiltered = computed(() => {
    const pokemonList = this.pokemonList();

    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm().trim().toLowerCase())
    );
  });

  protected size(pkm: Pokemon) {
    if (pkm.life <= 15) {
      return 'Petit';
    }
    if (pkm.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }

  protected incrementLife(pkm: Pokemon) {
    pkm.life += 1;
  }

  protected decrementLife(pkm: Pokemon) {
    pkm.life -= 1;
  }
}
