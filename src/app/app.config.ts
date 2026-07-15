import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './config/page-not-found/page-not-found';
import { PokemonEdit } from './pokemon/pokemon-edit/pokemon-edit';

const routes: Routes = [
  { path: 'pokemons/edit/:id', component: PokemonEdit, title: 'Edit Pokémon' },
  { path: 'pokemons/:id', component: PokemonProfile, title: 'Pokémon' },
  { path: 'pokemons', component: PokemonListComponent, title: 'Pokédex' },
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
