
// Creamos una interfaces
// este no se declara solo sirve para especificar o modelar un tipo de dato
export interface Character {
    // añadimos un id al character, pero con ? lo hacemos opcional
    // En casos normales debería ser obligatorio, pero por este caso lo haremos así
    id?:   string;
    name:  string;
    power: number;
}