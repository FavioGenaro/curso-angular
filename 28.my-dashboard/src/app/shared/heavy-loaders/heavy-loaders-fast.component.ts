import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full', cssClass ]">
      <!-- Colocamos los hijos dentro del section -->
      <ng-content />
    </section>
  `
})
export class HeavyLoadersFastComponent {
  // recibmos una clase
  @Input({ required: true }) cssClass!: string;

  constructor() {
    console.log('HeavyLoader Fast creado');
  }

}
