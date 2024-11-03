// Enum Color, 0,1,2,3 para los colores

export enum Color {
    red, black, blue, green
}


export interface Hero {
    name:   string;
    canFly: boolean;
    color:  Color;
}