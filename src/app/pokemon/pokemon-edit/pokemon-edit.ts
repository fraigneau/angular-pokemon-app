import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import {
  FormArray,
  FormControl,
  FormGroup,
  isFormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.html',
  styles: ``,
})
export class PokemonEdit {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    type: new FormArray(this.pokemon().types.map((type) => new FormControl(type))),
  });
}
