Miela Stock — Backend
API RESTful para la gestión de inventarios, desarrollada con Node.js, Express y MongoDB. Permite administrar productos, clientes y proveedores, e incorpora autenticación mediante JWT, contraseñas protegidas con bcrypt, validación de datos y autorización basada en roles.

Proyecto integrador final de desarrollo Backend.
Tecnologías
- Node.js y Express
- MongoDB y Mongoose
- JavaScript
- JSON Web Token (JWT) para autenticación
- bcrypt para protección de contraseñas
- express-validator para validación de solicitudes
- dotenv para configuración de entorno
Funcionalidades
- API REST con operaciones de consulta, creación, actualización y eliminación.
- Persistencia de productos, usuarios, clientes y proveedores en MongoDB.
- Registro e inicio de sesión de usuarios.
- Autenticación con tokens JWT.
- Roles user y admin, con control de acceso según los permisos.
- Validación de entradas y manejo de errores HTTP.
- Limitación de solicitudes en endpoints de autenticación.
Permisos
Funcionalidad	Usuario autenticado (user)	Administrador (admin)
Consultar productos	Sí	Sí
Crear, editar o eliminar productos	No	Sí
Consultar o administrar clientes	No	Sí
Consultar o administrar proveedores	No	Sí


El registro público crea cuentas con rol user. La promoción a administrador se realiza por separado mediante un script de mantenimiento; no está disponible desde el registro público.
Estructura del proyecto

miela_stock_backend/
└── postman/
    └── Miela_Stock.postman_collection.json
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
└── .gitignore

Requisitos e instalación local
Se necesita Node.js, pnpm y una instancia accesible de MongoDB (local o Atlas).
1. Clonar el repositorio y entrar en su directorio.
2. Instalar las dependencias:
pnpm install
3.Crear un archivo .env local con las variables necesarias:
MONGO_URI=mongodb://127.0.0.1:27017/miela_stock
JWT_SECRET=reemplazar_por_una_clave_secreta_segura
PORT=4000
La URI es un ejemplo para desarrollo local, no una credencial ni un enlace de producción. Adaptarla a la configuración real de MongoDB. No subir .env al repositorio.
4. Iniciar el servidor:
node server.js
Endpoints principales

Los endpoints siguientes describen las rutas del proyecto. Las operaciones de modificación requieren autenticación y los permisos correspondientes.

Método	 Ruta	              Descripción	                     Acceso
POST	 /users/register	  Registrar usuario	                 Público
POST	 /users/login	      Iniciar sesión y obtener JWT	     Público
GET	     /api/products	      Consultar productos	             Autenticado
GET	     /api/products/:id	  Consultar producto por ID	         Autenticado
POST	 /api/products	      Crear producto	                 Administrador
PUT	     /api/products/:id	  Actualizar producto	             Administrador
DELETE	 /api/products/:id	  Eliminar producto	                 Administrador
GET	     /api/clients	      Consultar clientes	             Administrador
POST	 /api/clients	      Crear cliente	                     Administrador
PUT	     /api/clients/:id	  Actualizar cliente	             Administrador
DELETE	 /api/clients/:id	  Eliminar cliente	                 Administrador
GET	     /api/suppliers	      Consultar proveedores	             Administrador
POST	 /api/suppliers	      Crear proveedor	                 Administrador
PUT	     /api/suppliers/:id   Actualizar proveedor	             Administrador
DELETE	 /api/suppliers/:id	  Eliminar proveedor	             Administrador

El módulo de usuarios incluye además operaciones de administración protegidas por el rol administrador.
Ejemplo de registro
POST /users/register
Content-Type: application/json
{
  "name": "Usuario Demo",
  "email": "demo@example.com",
  "password": "CambiarPorUnaClaveSegura123!"
}
La contraseña de este ejemplo es ficticia. El registro público no permite asignar el rol administrador.
Autenticación
Después del inicio de sesión, las solicitudes a rutas protegidas deben enviar el JWT en la cabecera:
Authorization: Bearer <TOKEN_JWT>
Las solicitudes sin autenticación o sin permisos suficientes reciben los códigos HTTP correspondientes, por ejemplo 401 Unauthorized y 403 Forbidden.
Administración de usuarios
El proyecto incluye scripts/make-admin.js para promover una cuenta ya registrada al rol administrador:
node scripts/make-admin.js admin@example.com
El script necesita acceso autorizado a la base de datos mediante MONGO_URI. Usar una dirección de correo real de una cuenta previamente creada; admin@example.com es solo un ejemplo. No publicar credenciales de acceso ni cuentas de prueba con contraseñas reales en el repositorio.
Pruebas
Durante el desarrollo se realizaron pruebas locales de endpoints y permisos mediante solicitudes HTTP, incluyendo:
- Operaciones CRUD de las entidades.
- Registro e inicio de sesión.
- Acceso con token válido y sin token (401).
- Restricción de operaciones administrativas a usuarios sin permisos (403).
- Operaciones autorizadas para el rol administrador.
- Validaciones y respuestas ante errores.
La colección de Postman para la entrega debe exportarse y adjuntarse sin tokens, contraseñas ni datos sensibles reales.
Despliegue
La API puede desplegarse en Render y conectarse a MongoDB Atlas configurando las variables de entorno directamente en el servicio. No es necesario publicar el archivo .env.

Una vez desplegado, incorporar aquí la URL pública de la API y comprobar los endpoints sobre esa dirección.
Seguridad
- Las contraseñas se almacenan usando hash con bcrypt.
- JWT protege las rutas que requieren autenticación.
- Los permisos distinguen usuarios comunes de administradores.
- Se validan los datos recibidos y se controlan errores HTTP.
- .gitignore excluye dependencias y archivos locales con secretos.


Miela Stock · Proyecto integrador final de desarrollo Backend.