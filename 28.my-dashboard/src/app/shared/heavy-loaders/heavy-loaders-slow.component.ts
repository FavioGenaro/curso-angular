import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- agregamos la clase css que recibimos -->
    <section [ngClass]="['w-full h-[600px]', cssClass]">
      Heavy Loader Slow
    </section>
  `
})
export class HeavyLoadersSlowComponent {
  // Este es un componente bloqueante, que demorará en cargar

  // recibe el valor para un clase css
  @Input({ required: true }) cssClass!: string;

  constructor() {

    const start = Date.now();
    // espera 3 segundos, esto bloquea JavaScript, no podremos hacer 
    while( Date.now() - start < 3000 ) {} 

    console.log('Cargado');
  }
}
