# 🏥 Backend - Sistema de Gestión Veterinaria "Patitas Felices"

## 📝 Descripción General

Backend desarrollado en **Node.js** con **Express** y **TypeScript** para el sistema de gestión de la veterinaria "Patitas Felices". El sistema permite administrar información de manera segura y organizada, incluyendo la gestión de dueños, mascotas, veterinarios e historial clínico.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Lenguaje de programación tipado
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM (Object Document Mapper) para MongoDB
- **JWT** (jsonwebtoken) - Autenticación mediante tokens
- **bcrypt** - Encriptación de contraseñas
- **express-validator** - Validación de datos de entrada
- **cors** - Manejo de CORS
- **morgan** - Logger HTTP
- **dotenv** - Manejo de variables de entorno

## 📁 Arquitectura

El proyecto sigue una arquitectura **MVC (Modelo-Vista-Controlador)** con capa de servicios:

```
backend/
├── src/
│   ├── config/          # Configuración (base de datos, etc.)
│   ├── controllers/     # Controladores (manejo de peticiones HTTP)
│   ├── middlewares/     # Middlewares (autenticación, errores, etc.)
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Utilidades y helpers
│   ├── validator/       # Validadores con express-validator
│   └── index.ts         # Punto de entrada
├── .env.example         # Ejemplo de variables de entorno
└── package.json         # Dependencias del proyecto
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- MongoDB (local o remoto)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd tp-final-nelson-avila/backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   PORT=3000
   BASE_URL=http://localhost
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/tp_final_db
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=1d
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   ```

6. **Ejecutar en producción**
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

## 🔐 Autenticación

El sistema utiliza autenticación mediante **JWT (JSON Web Tokens)**. Todas las rutas protegidas requieren un token válido en el header:

```
Authorization: Bearer <token>
```

### Endpoints de Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

## 📡 Endpoints Disponibles

### Autenticación (Públicas)

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "username": "usuario123",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "user_id",
    "email": "usuario@example.com",
    "username": "usuario123"
  }
}
```

### Dueños (Owners) - Requiere Autenticación

- `GET /api/owners` - Listar todos los dueños
- `GET /api/owners/:id` - Obtener dueño por ID
- `GET /api/owners/dni/:dni` - Obtener dueño por DNI
- `POST /api/owners` - Crear nuevo dueño
- `PUT /api/owners/:id` - Actualizar dueño
- `DELETE /api/owners/:id` - Eliminar dueño (soft delete)

**Ejemplo - Crear Dueño:**
```http
POST /api/owners
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Juan",
  "surname": "Pérez",
  "dni": 12345678,
  "phone": "1234567890",
  "address": "Calle Falsa 123"
}
```

### Mascotas (Pets) - Requiere Autenticación

- `GET /api/pets` - Listar todas las mascotas
- `GET /api/pets/:id` - Obtener mascota por ID
- `POST /api/pets` - Crear nueva mascota
- `PUT /api/pets/:id` - Actualizar mascota
- `DELETE /api/pets/:id` - Eliminar mascota (soft delete)

**Ejemplo - Crear Mascota:**
```http
POST /api/pets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Max",
  "species": "Perro",
  "birthdate": "2020-01-15",
  "ownerId": "owner_id_here"
}
```

### Veterinarios (Veterinarians) - Requiere Autenticación

- `GET /api/veterinarians` - Listar todos los veterinarios
- `GET /api/veterinarians/:id` - Obtener veterinario por ID
- `POST /api/veterinarians` - Crear nuevo veterinario
- `PUT /api/veterinarians/:id` - Actualizar veterinario
- `DELETE /api/veterinarians/:id` - Eliminar veterinario (soft delete)

**Ejemplo - Crear Veterinario:**
```http
POST /api/veterinarians
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "María",
  "surname": "González",
  "medicalLicense": "VET12345",
  "specialty": "Cirugía"
}
```

### Historial Clínico (Medical History) - Requiere Autenticación

- `GET /api/medical-histories` - Listar todos los historiales
- `GET /api/medical-histories/:id` - Obtener historial por ID
- `POST /api/medical-histories` - Crear nuevo historial
- `PUT /api/medical-histories/:id` - Actualizar historial
- `DELETE /api/medical-histories/:id` - Eliminar historial (soft delete)

**Ejemplo - Crear Historial Clínico:**
```http
POST /api/medical-histories
Authorization: Bearer <token>
Content-Type: application/json

{
  "petId": "pet_id_here",
  "veterinarianId": "vet_id_here",
  "description": "Consulta de rutina, vacunación anual",
  "registrationDate": "2024-01-15"
}
```

## 🔒 Seguridad

- **Autenticación JWT**: Todas las rutas protegidas requieren token válido
- **Encriptación de contraseñas**: Uso de bcrypt con salt rounds
- **Validación de datos**: express-validator en todas las rutas
- **Manejo centralizado de errores**: Middleware de errores unificado
- **Soft delete**: Las entidades no se eliminan físicamente, se marcan como eliminadas

## 📝 Variables de Entorno

Ver archivo `.env.example` para referencia completa. Variables principales:

- `PORT` - Puerto del servidor (default: 3000)
- `BASE_URL` - URL base del servidor
- `NODE_ENV` - Entorno (development/production)
- `MONGODB_URI` - URI de conexión a MongoDB
- `JWT_SECRET` - Clave secreta para firmar tokens JWT
- `JWT_EXPIRES_IN` - Tiempo de expiración del token (ej: "1d", "24h")

## 🌐 Frontend

El frontend está desarrollado en **React** y se encuentra en la carpeta `../frontend`. Es un frontend desacoplado que consume este backend mediante peticiones HTTP.

## 📚 Estructura de Respuestas

### Respuestas Exitosas

**GET:**
```json
{
  "success": true,
  "data": { ... }
}
```

**POST, PUT, DELETE:**
```json
{
  "success": true
}
```

### Respuestas de Error

```json
{
  "success": false,
  "message": "Mensaje de error descriptivo"
}
```

## 🧪 Pruebas

Se incluye una colección de Postman en el archivo `postman_collection.json` para probar todos los endpoints.

## 📄 Licencia

Este proyecto es parte del Trabajo Práctico Final Integrador.

---

**Desarrollado por Nelson Avila** 🚀
