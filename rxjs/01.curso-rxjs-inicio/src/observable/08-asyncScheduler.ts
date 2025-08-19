import { asyncScheduler } from 'rxjs';

// con el asyncScheduler se pueden emular las siguiente funciones, pero con mayor control
// setTimeout (() => {}, 3000);
// setInterval(() => {}, 3000);

// el asyncScheduler es un scheduler que permite ejecutar funciones de manera asíncrona
// este genera un suscriber (como el .suscribe()) que ejecuta la función en el futuro, después de un tiempo determinado

const saludar  = () => console.log('Hola Mundo');
const saludar2 = nombre => console.log(`Hola ${ nombre }`);

// en ese ejemplo, se ejecuta la función saludar después de 2 segundos
// asyncScheduler.schedule( saludar, 2000 );

// se puede pasar un segundo argumento para enviar un valor a la función
// este tercer el argumento es el valor que se le pasará a la función, es el estado del scheduler
// este método solo debe tener un argumento
// asyncScheduler.schedule( saludar2, 2000, 'Fernando' ); 


// simulación de un setInterval
// no podemos pasar una función de flecha

// el schedule genera un suscriber
const subs = asyncScheduler.schedule( function(state){

    console.log('state', state);

    // podemos llamar al scheduler de nuevo para que se ejecute la función nuevamente
    // el primer argumento es el estado que se le pasará a la función y el segundo es el tiempo de espera
    // en este caso, se ejecutará cada 1 segundo
    this.schedule( state + 1, 1000 );
    
}, 3000, 0);


// al desuscribirnos, se detiene la ejecución de la función
// esto es similar a un setTimeout, pero con la posibilidad de desuscribirse.
// este método es útil para evitar fugas de memoria en aplicaciones que utilizan RxJS, ya que no se ejecutará indefinidamente en el fondo.
// setTimeout( () => {
//     subs.unsubscribe();
// }, 6000);

// para desuscribirnos después de 6 segundos
// este emula el setTimeout
// podemos usar el asyncScheduler para programar la desuscripción
asyncScheduler.schedule( ()=> subs.unsubscribe(), 6000 );









