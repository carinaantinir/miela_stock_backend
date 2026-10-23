# Miela Stock — Backend

**Proyecto Integrador Final — Desarrollo Backend | ADA — 2026**

API REST para la gestión de inventario, desarrollada con Node.js, Express y MongoDB.

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

- Registro e inicio de sesión de usuarios.
- Operaciones CRUD de productos, clientes y proveedores.
- Persistencia de datos en MongoDB.
- Autenticación mediante JWT.
- Roles `user` y `admin`.
- Protección de rutas y control de permisos.
- Validación de datos y manejo de errores HTTP.
- Limitación de solicitudes de autenticación.

## Permisos

| Funcionalidad | Usuario (`user`) | Administrador (`admin`) |
|---|:---:|:---:|
| Consultar productos | Sí | Sí |
| Crear, actualizar y eliminar productos | No | Sí |
| Consultar y administrar clientes | No | Sí |
| Consultar y administrar proveedores | No | Sí |

El registro público crea cuentas con rol `user`. La asignación del rol `admin` se realiza por separado.

## Enlaces del proyecto

**Aplicación web — Vercel:**  
https://miela-stock-frontend.vercel.app

**API REST — Render:**  
https://miela-stock-backend.onrender.com

**Repositorio del frontend:**  
https://github.com/carinaantinir/miela_stock_frontend

**Repositorio del backend:**  
https://github.com/carinaantinir/miela_stock_backend

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
| GET | `/` | Estado de la API | Público |
| POST | `/users/register` | Registro de usuarios | Público |
| POST | `/users/login` | Inicio de sesión | Público |
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

El módulo de usuarios también implementa operaciones administrativas protegidas mediante autorización por roles.

## Estado de la API — Health Check

La API incorpora un endpoint público para verificar el estado del servidor desplegado en Render.

**Endpoint:** `GET /`

**URL:** https://miela-stock-backend.onrender.com/

**Respuesta HTTP 200:**

```json
{
  "status": "ok",
  "message": "Miela Stock API funcionando correctamente"
}

## Autenticación

La API utiliza JSON Web Tokens para autenticar solicitudes.

Después de iniciar sesión, las solicitudes a rutas protegidas deben incluir la cabecera:

```http
Authorization: Bearer <TOKEN_JWT>
```

El middleware verifica el token, consulta el usuario correspondiente y comprueba sus permisos cuando la operación requiere acceso administrativo.

## Códigos de respuesta HTTP

Los siguientes códigos y mensajes corresponden a las respuestas implementadas en `app.js`, los controladores de productos y usuarios, el controlador genérico de registros y el middleware de autenticación.

| Código | Situación | Mensaje o respuesta |
|---|---|---|
| 200 | API disponible | Miela Stock API funcionando correctamente |
| 200 | Inicio de sesión exitoso | Inicio de sesión correcto |
| 200 | Consulta exitosa | Devuelve los registros solicitados |
| 200 | Usuario actualizado | Usuario actualizado correctamente |
| 200 | Cliente o proveedor actualizado | Registro actualizado correctamente |
| 200 | Producto eliminado | Producto eliminado correctamente |
| 200 | Cliente o proveedor eliminado | Registro eliminado correctamente |
| 201 | Usuario registrado | Usuario registrado correctamente |
| 201 | Producto creado | Devuelve el producto creado |
| 201 | Cliente o proveedor creado | Registro creado correctamente |
| 400 | ID de producto inválido | ID de producto inválido |
| 400 | ID de usuario inválido | ID de usuario inválido |
| 400 | ID de cliente o proveedor inválido | ID inválido |
| 400 | Error de validación de Mongoose | Error de validación |
| 400 | Actualización de registro sin campos | No se enviaron campos para actualizar |
| 400 | Actualización de usuario sin campos | Debés enviar al menos un campo para actualizar |
| 401 | Falta de autenticación | Se requiere autenticación |
| 401 | Token vacío | Token no proporcionado |
| 401 | Token inválido o vencido | Token inválido o vencido |
| 401 | Usuario del token inexistente | La sesión ya no es válida |
| 401 | Credenciales incorrectas | Credenciales inválidas |
| 403 | Usuario sin permisos administrativos | Acceso reservado a administradores |
| 403 | Eliminación de la propia cuenta administradora | No podés eliminar tu propia cuenta administradora |
| 404 | Ruta inexistente | Ruta no encontrada |
| 404 | Producto inexistente | Producto no encontrado |
| 404 | Usuario inexistente | Usuario no encontrado |
| 404 | Cliente o proveedor inexistente | Registro no encontrado |
| 409 | Correo electrónico duplicado | El email ya está registrado |
| 429 | Exceso de solicitudes de registro | Demasiadas solicitudes. Intentá nuevamente más tarde. |
| 429 | Exceso de intentos de inicio de sesión | Demasiados intentos de inicio de sesión. Intentá más tarde. |
| 500 | Error gestionado por el middleware global | Error interno del servidor |

Algunas operaciones también devuelven el mensaje específico del error mediante `error.message`.

## Administración de usuarios

El proyecto incluye el script `scripts/make-admin.js`, utilizado para asignar el rol administrador a una cuenta previamente registrada.

```bash
node scripts/make-admin.js admin@example.com
```

El script utiliza la conexión a MongoDB configurada mediante `MONGO_URI`.

## Pruebas con Postman

Las pruebas de la API se realizaron mediante solicitudes HTTP utilizando Postman.

Incluyen operaciones CRUD, autenticación mediante JWT, validación de datos y verificación de permisos.

La colección está disponible en el repositorio:

**[Colección de Postman — Miela Stock](postman/Miela_Stock.postman_collection.json)**

## Despliegue

La aplicación utiliza una arquitectura cliente-servidor.

```text
Frontend — React / Vercel
           |
           v
Backend — Node.js + Express / Render
           |
           v
Base de datos — MongoDB Atlas
```

El frontend consume la API REST publicada en Render. El backend utiliza Mongoose para comunicarse con MongoDB Atlas.

Las variables de entorno del backend se configuran en el servicio de Render.

## Seguridad

- Contraseñas protegidas mediante bcrypt.
- Autenticación mediante JWT.
- Autorización basada en roles.
- Validación de solicitudes.
- Protección de rutas administrativas.
- Limitación de solicitudes en registro e inicio de sesión.
- Configuración mediante variables de entorno.

## Autora

**Carina Antiñir**  
    ADA — 2026