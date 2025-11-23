# SubTracker

**SubTracker** es una aplicación de gestión de finanzas personales diseñada para rastrear gastos recurrentes (suscripciones). El objetivo principal es visualizar cuánto dinero se gasta mensualmente en servicios como streaming, gimnasio o software.

## Tecnologías

### Frontend

- **Framework:** VueJS 3
- **Paradigma:** Composition API (`<script setup>`)
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** SQLite (sql.js)
- **API:** REST API

## Inicio Rápido

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd sub-tracker
   ```

2. **Instalar dependencias del frontend:**

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**

   ```bash
   npm run dev:all
   ```

   Este comando:

   - Instala automáticamente las dependencias del API si no están presentes
   - Inicia el frontend en `http://localhost:5173`
   - Inicia el backend API en `http://localhost:3000`

## Endpoints del API

El API corre en `http://localhost:3000`

- `GET /api/subscriptions` - Obtener todas las suscripciones
- `GET /api/subscriptions/:id` - Obtener una suscripción por ID
- `POST /api/subscriptions` - Crear una nueva suscripción
- `PUT /api/subscriptions/:id` - Actualizar una suscripción
- `DELETE /api/subscriptions/:id` - Eliminar una suscripción

## Requerimientos Funcionales

### 1. Gestión de Suscripciones (CRUD)

- ✅ **Listar:** Mostrar todas las suscripciones activas en tarjetas visuales
- ✅ **Crear:** Formulario para agregar una nueva suscripción
- ✅ **Editar:** Posibilidad de modificar el precio, nombre o la fecha de pago
- ✅ **Eliminar:** Botón para remover una suscripción de la lista

### 2. Lógica de Negocio

- ✅ **Cálculo de Totales:** Mostrar un encabezado con el **Gasto Total Mensual Estimado**
- ✅ **Normalización de Frecuencia:**
  - Si una suscripción es _Mensual_, se suma el precio tal cual
  - Si una suscripción es _Anual_, el sistema divide el costo entre 12 para sumarlo al promedio mensual
- ✅ **Conversión de Moneda:**
  - El sistema permite entradas en **USD** y **HNL**
  - Para el cálculo del total, todo se convierte a HNL usando una tasa fija de 26

## Base de Datos

La base de datos SQLite se crea automáticamente en `api/db/subscriptions.db` al ejecutar el servidor por primera vez.

### Esquema de la tabla `subscriptions`:

- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT, NOT NULL)
- `price` (REAL, NOT NULL)
- `currency` (TEXT, NOT NULL, CHECK: 'USD' o 'HNL')
- `frequency` (TEXT, NOT NULL, CHECK: 'monthly' o 'annual')
- `paymentDate` (TEXT, NOT NULL)

## Notas

- El frontend corre en `http://localhost:5173`
- El backend corre en `http://localhost:3000`
- La base de datos se crea automáticamente al iniciar el servidor
- Los datos persisten entre reinicios del servidor
