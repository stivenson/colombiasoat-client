# Aplicación web desplegada en Heroku
    
* Vista de registro de soats 
[Registro Público Soats](http://colombiasoat-client.herokuapp.com/indexsoat.html)
* Vista de administración 
[Acceso Administracion](http://colombiasoat-client.herokuapp.com/index.html)

* Anexo, vídeo corto explicando navegación de la parte de soats 
[Vídeo](https://youtu.be/xJVQqSxsQcI)   

# Cliente  (Aplicación SPA en mithril.js con sintaxis JSX usando ES6)

Este es un esqueleto, gestionado por [Brunch](http://brunch.io).

## Pasos iniciales

* Instalación:
    * Descargar el repositorio y ubicarse en el folder colombiasoat-client
    * [Node.js](http://nodejs.org): `brew install node` en OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * plugins de brunch y dependencias de la app: `npm install`
* Para correr:
    * `brunch build --production` — Construye proyecto minificado para producción.
    * `brunch watch --server` — Observa el proyecto con la reconstrucción continua (Desarrollo).
    * Despues correr el proyecto para desarrollo, cada vez que el código cambie, todas las tareas automatizadas, incluyendo recargar el navegador (Si es necesario) se ejecutarán. 

    Una ver terminado este proceso, la aplicación se puede apreciar en las url [http://localhost:3333/](http://localhost:3333/)

* Sobres las carpetas:
    * `public/`este directorio es totalmente auto-generado y servido por el servidor HTTP.  Se escribe el código en el directorio `app/`.
    * Acá van los archivos estaticos `app/assets/` que finalmente quedan en `public/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)
