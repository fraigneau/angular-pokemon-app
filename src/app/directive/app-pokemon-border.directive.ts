import { Directive, ElementRef, HostListener, input } from '@angular/core';
import { getPokemonColor } from '../model/pokemon.model';

@Directive({
  selector: '[appPokemonBorder]',
})
export class appPokemonBorder {
  private initialColor: String;
  pokemonType = input.required<String>();

  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.getBorderColor();
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = (this.initialColor = '');
    this.setBorder(color);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  private getBorderColor() {
    return getPokemonColor(this.pokemonType().valueOf());
  }
}
