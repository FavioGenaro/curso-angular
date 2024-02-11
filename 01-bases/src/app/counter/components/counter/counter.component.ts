import { Component } from "@angular/core"; // parte de angular que ofrece muchas cosas


@Component({ // es obligatorio que todo componente tenga un template y selector
    selector: 'app-counter',
    template: `
        <h1>Hola Counter</h1>
        <h3>Counter: {{counter}}</h3>
        <!-- 
            tmb puede ser this.increaseBy(), pero por defecto se entiendo que es al app.component 
            De esta forma podemos ejecutar funciones del component dentro del html
        -->
        <button (click)="increaseBy(1)">+1</button>
        <button (click)="decrementBy(1)">-1</button>
        <button (click)="resetCounter()">Reset</button>
    `
})
export class CounterComponent{
    public counter: number = 10;

    // por defecto el método es public, y no se suele colocar.
    increaseBy( value: number):void{
        this.counter += value;
    }

    decrementBy( value: number):void{
        this.counter -= value;
    }

    resetCounter():void{
        this.counter = 10;
    }
}