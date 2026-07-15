import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';

const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfile },
  { path: 'pokemons', component: PokemonListComponent },
  {path: '', redirectTo: 'pokemons', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
