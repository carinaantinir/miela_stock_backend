# Miela Stock — Backend

**Proyecto Integrador Final — Desarrollo Backend | ADA**

API REST para la gestión de inventarios, desarrollada con Node.js, Express y MongoDB.

Permite administrar productos, clientes y proveedores, e incorpora autenticación mediante JWT, protección de contraseñas con bcrypt, validación de datos y autorización basada en roles.

## Tecnologías

- Node.js
- Express
- JavaScript
- MongoDB y Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- express-rate-limit
- dotenv
- pnpm

## Funcionalidades

- API REST con operaciones CRUD.
- Persistencia de productos, usuarios, clientes y proveedores.
- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Roles `user` y `admin`.
- Autorización y protección de rutas.
- Validación de datos y manejo de errores HTTP.
- Limitación de solicitudes en endpoints de autenticación.

## Permisos

| Funcionalidad | Usuario (user) | Administrador (admin) |
|---|:---:|:---:|
| Consultar productos | Sí | Sí |
| Crear, editar o eliminar productos | No | Sí |
| Consultar y administrar clientes | No | Sí |
| Consultar y administrar proveedores | No | Sí |

El registro público crea cuentas con rol `user`. La asignación del rol `admin` se realiza mediante un script de administración.

## Estructura del proyecto

```text
miela_stock_backend/
├── postman/
│   └── Miela_Stock.postman_collection.json
├── scripts/
│   └── make-admin.js
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── service/
│   ├── app.js
│   └── db.js
├── server.js
├── package.json
├── pnpm-lock.yaml
├── .gitignore
└── README.md
```

## Enlaces del proyecto

**API publicada — Render:**  
https://miela-stock-backend.onrender.com

**Aplicación web — Vercel:**  
https://miela-stock-frontend.vercel.app

**Repositorio backend:**  
https://github.com/carinaantinir/miela_stock_backend

**Repositorio frontend:**  
https://github.com/carinaantinir/miela_stock_frontend

## Instalación local

### Requisitos

- Node.js
- pnpm
- MongoDB local o MongoDB Atlas

### Clonar el repositorio

```bash
git clone https://github.com/carinaantinir/miela_stock_backend.git
cd miela_stock_backend
```

### Instalar dependencias

```bash
pnpm install
```

### Variables de entorno

El backend utiliza las siguientes variables:

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Cadena de conexión a MongoDB |
| `JWT_SECRET` | Clave utilizada para firmar tokens JWT |
| `PORT` | Puerto del servidor (predeterminado: 4000) |

### Ejecutar el servidor

```bash
node server.js
```

Dirección local predeterminada:

```text
http://localhost:4000
```

## Endpoints principales

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/users/register` | Registrar usuario | Público |
| POST | `/users/login` | Iniciar sesión | Público |
| GET | `/api/products` | Consultar productos | Autenticado |
| GET | `/api/products/:id` | Consultar producto por ID | Autenticado |
| POST | `/api/products` | Crear producto | Administrador |
| PUT | `/api/products/:id` | Actualizar producto | Administrador |
| DELETE | `/api/products/:id` | Eliminar producto | Administrador |
| GET | `/api/clients` | Consultar clientes | Administrador |
| POST | `/api/clients` | Crear cliente | Administrador |
| PUT | `/api/clients/:id` | Actualizar cliente | Administrador |
| DELETE | `/api/clients/:id` | Eliminar cliente | Administrador |
| GET | `/api/suppliers` | Consultar proveedores | Administrador |
| POST | `/api/suppliers` | Crear proveedor | Administrador |
| PUT | `/api/suppliers/:id` | Actualizar proveedor | Administrador |
| DELETE | `/api/suppliers/:id` | Eliminar proveedor | Administrador |

El módulo de usuarios incluye operaciones administrativas protegidas mediante autorización por roles.

## Autenticación

La API utiliza JSON Web Tokens para autenticar solicitudes.

Después de iniciar sesión, las solicitudes a rutas protegidas incluyen la cabecera:

```http
Authorization: Bearer <TOKEN_JWT>
```

Las respuestas HTTP contemplan, entre otros, los siguientes estados:

| Código | Descripción |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 400 | Solicitud inválida |
| 401 | Autenticación requerida o inválida |
| 403 | Permisos insuficientes |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## Administración de usuarios

El proyecto incluye el script `scripts/make-admin.js`, utilizado para asignar el rol administrador a una cuenta previamente registrada.

```bash
node scripts/make-admin.js admin@example.com
```

El script utiliza la conexión a MongoDB configurada mediante `MONGO_URI`.

## Pruebas con Postman

Los endpoints y permisos se probaron mediante solicitudes HTTP utilizando Postman.

Las pruebas incluyen:

- Registro e inicio de sesión.
- Operaciones CRUD.
- Autenticación con JWT.
- Restricción de acceso sin token (401).
- Restricción de permisos administrativos (403).
- Validación de datos y respuestas de error.

La colección de Postman está incluida en el repositorio:

```text
postman/Miela_Stock.postman_collection.json
```

## Despliegue

La API está desplegada en **Render** y conectada a **MongoDB Atlas**.

El frontend está desarrollado con React y publicado en **Vercel**.

**Arquitectura:**

```text
Frontend — React / Vercel
           |
           v
Backend — Node.js + Express / Render
           |
           v
Base de datos — MongoDB Atlas
```

Las aplicaciones se comunican mediante solicitudes HTTP/HTTPS.

## Seguridad

- Contraseñas protegidas mediante bcrypt.
- Autenticación mediante JWT.
- Autorización según roles.
- Validación de solicitudes.
- Protección de rutas administrativas.
- Limitación de solicitudes de autenticación.
- Gestión de configuración mediante variables de entorno.

## Autora

**Carina Antiñir**  
 
    ADA — 2026