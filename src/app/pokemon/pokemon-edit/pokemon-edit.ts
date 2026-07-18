import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../model/pokemon.model';
import { CommonModule } from '@angular/common';

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
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.minLength(POKEMON_RULES.MIN_NAME),
    ]),
    life: new FormControl(this.pokemon().life, [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_LIFE),
      Validators.min(POKEMON_RULES.MIN_LIFE),
    ]),
    damage: new FormControl(this.pokemon().damage, [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_DAMAGE),
      Validators.min(POKEMON_RULES.MIN_DAMAGE),
    ]),
    type: new FormArray(this.pokemon().types.map((type) => new FormControl(type)), [
      Validators.required,
      Validators.maxLength(POKEMON_RULES.MAX_TYPES),
      Validators.minLength(POKEMON_RULES.MIN_TYPES),
    ]),
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

  protected getTextColor(type: string): string {
    return type === 'Electrik' ? '#000' : '#FFF';
  }

  protected POKEMON_RULES = POKEMON_RULES;

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
