// writeFileSync, para escribir el archivo
// mkdirSync, para crear el directorio
const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

// ruta donde crearemos el archivo
const targetPath = './src/environments/environment.ts';

// contenido del archivo
// ahora podemos usar process.env, por el dotenv
const envFileContent = `
export const environment = {
    mapbox_key: "${ process.env['MAPBOX_KEY'] }",
    otra: "PROPIEDAD",
};
`;

// Creamos la carpeta,  recursive en true porque si existe lo vamos a sobreescribir
mkdirSync('./src/environments', { recursive: true });
// Creamos el archivo en la ruta indicada (ruta + nombre del archivo) y con el contenido
writeFileSync( targetPath, envFileContent );