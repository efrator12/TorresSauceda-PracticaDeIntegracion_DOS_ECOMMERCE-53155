# ProductManager Y CartManager (Servidor web y Express Avanzado - Implementacion de MongoDB)

El proyecto de ProductManager se enfoca en la gestión de un catálogo de productos como objetos.
En el archivo `src\routes\products.routes.js`, creamos las peticiones principales que incluyen las siguientes funciones:
  - AGREGAR Productos
  - OBTENER TODOS los Productos
  - OBTENER Productos por ID
  - ACTUALIZAR Productos por ID
  - ELIMINAR Productos por ID

El proyecto CartManager es un servicio para manejar carritos de compras sobre los productos relacionados en el catalogo de ProductManager.
En el archivo `src\routes\carts.routes.js`, creamos las peticiones principales que incluyen las siguientes funciones:
  - Permite CREAR nuevos carritos.
  - OBTENER todos los carritos existentes.
  - OBTENER los productos de un carrito específico por ID.
  - AÑADIR diversos/repetidos productos a un carrito existente.

El catálogo de productos y los carritos se guardan en una base de datos en MongoDB (con sus respectivos nombres para cada documento).

En el servidor `app.js` hacemos al archivo `index.js` el cual contiene un ruteo para ambos proyectos el cual les da una salida por medio de la importacion y direccion de ruta en `/api/products` o `/api/carts`.
El archivo routes.js de cada proyecto contiene las funciones principales que puede realizar el modelo para los productos y carritos mediante los multiples métodos importados. Desde aquí, solicitamos todos los Productos, podemos filtrarlos por ID o establecer una cantidad específica para visualizar en pantalla. En los carritos podemos agregar multiples productos por su ID.

## Pasos para ejecutar el proyecto:
1. Clona este repositorio en tu máquina local (node.js instalado).
2. Navega hasta el directorio `ProductManager - ECOMMERCE`.
3. Ejecuta los siguientes comandos desde un CMD para compilar el proyecto:
    - Instala las dependencias para levantar un servidor en el `Puerto 8080`.
    - Ejecutar `npm run dev` para comenzar con el Testeo del aplicativo sobre el `/src/app.js`.
    - Abrir una pagina web `http://localhost:8080/api/products` para realizar los queries correspondientes en PRODUCTOS:
      * `http://localhost:8080/api/products`: respondera con todos los productos en catalogo.
      * `http://localhost:8080/api/products?list=5` respondera con solo los primeros 5 productos en catalogo.
      * `http://localhost:8080/api/products?list=0` respondera con todos los productos en catalogo.
      * `http://localhost:8080/api/products/2` respondera con el producto ID = 2 en catalogo.
      * `http://localhost:8080/api/products/15` respondera con un error (solo hay 10 productos en el catalogo).
    - Desde un POSTMAN contiene la posibilidad de agregar Productos mediante lo siguiente:
      * `Body < Raw < JSON` desde POSTMAN para agregar el Producto.
      * Producto: `{
         "title": "Llavero",
         "description": "Azul",
         "thumbnail": "https://www.google.com",
         "price": 299,
         "code": "adf121", 
         "stock": 100,
         "status": true
        }`
    - Abrir una pagina web `http://localhost:8080/api/carts` para realizar los queries correspondientes en CARTS:
    - Desde un POSTMAN contiene la posibilidad administrar Carritos mediante lo siguiente:
      * Con el metodo POST sobre `http://localhost:8080/api/carts`: se crearan los carritos (sin ningun parametro, solo su ID automatico y un objeto para los productos).
      * Con el metodo GET sobre `http://localhost:8080/api/carts` respondera con TODOS los carritos en disposicion.
      * Con el metodo GET sobre `http://localhost:8080/api/carts/:cid` respondera con solo los productos que se encuentran agregados en el carrito (si no contiene, soltara un aviso).
      * Con el metodo POST sobre `http://localhost:8080/api/carts/:cid/carts/:pid` se agregara el producto con su ID en el ID del carrito correspondiente (cid es "Carrito ID" y pid es "Producto ID").
      
## Estructura de directorios:
```
ProjectManager - ECOMMERCE
│
├── .gitignore
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config
    │   └── mongoDB.config.js
    ├── dao
    │   ├── filesysManager
    │   │   ├── CartManager.js
    │   │   ├── ProductManager.js
    │   │   └── data
    │   │       ├── carts.json
    │   │       └── products.json
    │   ├── models
    │   │   ├── cart.model.js
    │   │   └── product.model.js
    │   └── mongoDao
    │       ├── cart.dao.js
    │       └── product.dao.js
    └── routes
        ├── carts.routes.js
        ├── index.js
        └── products.routes.js
```
  - `package.json` contiene la información sobre el proyecto, como el nombre, la versión, las dependencias requeridas, los scripts de ejecución y la licencia. Es fundamental para la gestión y el funcionamiento del proyecto en el ecosistema de Node.js.
  - `src\app.js` es el punto de entrada principal de la aplicación. Aquí se configura y se inicia la aplicación Express, se definen middleware y se conectan las rutas.

  - `src/dao/filesysManager` contiene la implementación del manejo de datos utilizando el sistema de archivos (no se utiliza en esta practica).

  - `src\routes\carts.routes.js` define las rutas relacionadas con los endpoints de la API para los carritos de compras, como crear un nuevo carrito, obtener información sobre los carritos existentes y añadir productos a los carritos.
  - `src\routes\index.js` define las rutas principales de la API. Aquí se importan y se montan las rutas relacionadas con los productos y los carritos.
  - `src\routes\products.routes.js` define las rutas relacionadas con los endpoints de la API para los productos, como obtener información sobre los productos existentes.
  
  - `src/dao` contiene la lógica de acceso a datos. Está organizado para soportar diferentes métodos de almacenamiento, como el sistema de archivos y MongoDB.
    
  - `src/dao/models` contiene los modelos de datos para la aplicación, definidos utilizando Mongoose para MongoDB.
  - `src/dao/models/cart.model.js` define el esquema del carrito de compra para MongoDB.
  - `src/dao/models/product.model.js` define el esquema del producto para MongoDB.

  - `src/dao/mongoDao` contiene la implementación del manejo de datos utilizando MongoDB.
  - `src/dao/mongoDao/cart.dao.js` maneja la lógica relacionada con los carritos de compra utilizando MongoDB.
  - `src/dao/mongoDao/product.dao.js` maneja la lógica relacionada con los productos utilizando MongoDB.

  - `src/config/mongoDB.config.js` contiene la lógica para conectar a la base de datos y otras configuraciones relacionadas con MongoDB.
