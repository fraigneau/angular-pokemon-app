import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getPokemonColor} from '../../model/pokemon.model';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './pokemon-edit.html',
  styles: ``,
})
export class PokemonEdit {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
  protected readonly getPokemonColor = getPokemonColor;

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    type: new FormArray(this.pokemon().types.map((type) => new FormControl(type))),
  });

  get pokemonTypesList(): FormArray {
    return this.form.get('type') as FormArray;
  }

  isPokemonTypesSelected(type: String): boolean {
    return !!this.pokemonTypesList.controls.find((control) => control.value === type);
  }

  onPokemonTypeChange(type: String, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypesList.push(control);
    } else {
      const index = this.pokemonTypesList.controls.map((control) => control.value).indexOf(type);

      this.pokemonTypesList.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
