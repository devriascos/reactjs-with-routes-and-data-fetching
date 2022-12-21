# ReactJs App - Usando Router y Data Fetching

Esta app tiene la capacidad de conectarse con una api desarrollada en StrapiJs para gestionar el estado de los usuarios que hacer parte de un equipo de trabajo con dos roles: manager y colaborado que difieren en su capacidad de actualizar el estado de otros usuarios a Activo o Inactivo.

## Antes de empezar
Modifica el fichero .env que está en la raíz con tus respectivos valores:

````
REACT_PUBLIC_API_KEY=YOUR_API_KEY
REACT_PUBLIC_API_HOST=YOUR_API_HOST
````

* Nota: el api_key se proporciona desde StrapiJs, en el apartado de Tokens. El `API_HOST` debe incluir el puerto al que se harán las consultas, ejemplo:

````
REACT_PUBLIC_API_HOST="127.0.0.1:1337/api"
````

## Últimos pasos

Desde la raíz del proyecto, ejecutar:

```
npm install
#o
yarn install
```

Y luego de que termine, el siguiente comando:

```
npm start
#o
yarn start
```

Automáticamente abrirá una ventana en tu navegador con la vista de la aplicación, si no es así, abre directamente http://localhost:3000

Si se presenta algún error, revisar el mensaje que arroje la consola y posteriormente reportarlo como issue.
