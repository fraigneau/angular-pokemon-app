import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../service/pokemonService';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../model/pokemon.model';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

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

  readonly #pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error) => of({ value: undefined, error: error })),
    ),
  );

  readonly loading = computed(() => this.#pokemonResponse === undefined);
  readonly error = computed(() => this.#pokemonResponse()?.error !== undefined);
  readonly pokemon = computed(() => this.#pokemonResponse()?.value);

  protected readonly getPokemonColor = getPokemonColor;

  constructor() {
    effect(() => {
      const pokemon = this.pokemon();
      if (pokemon) {
        this.form.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
        pokemon.types.forEach((type) => {
          this.pokemonTypesList.push(new FormControl(type));
        });
      }
    });
  }

  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.minLength(POKEMON_RULES.MIN_NAME),
    ]),
    life: new FormControl(0, [
      Validators.required,
      Validators.min(POKEMON_RULES.MIN_LIFE),
      Validators.max(POKEMON_RULES.MAX_LIFE),
    ]),
    damage: new FormControl(0, [
      Validators.required,
      Validators.min(POKEMON_RULES.MIN_DAMAGE),
      Validators.max(POKEMON_RULES.MAX_DAMAGE),
    ]),
    type: new FormArray([], [Validators.required, Validators.maxLength(POKEMON_RULES.MAX_TYPES)]),
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

  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
