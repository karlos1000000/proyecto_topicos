# SubTracker 
**SubTracker** es una aplicación de gestión de finanzas personales diseñada para rastrear gastos recurrentes (suscripciones). El objetivo principal es visualizar cuánto dinero se gasta mensualmente en servicios como streaming, gimnasio o software.

## Tecnologías

* **Framework:** VueJS
* **Paradigma:** Composition API (`<script setup>`)
* **Lenguaje:** TypeScript
* **Build Tool:** Vite
* **Estilos:** Tailwind CSS (Recomendado) o CSS estándar.

---

## Requerimientos Funcionales

### 1. Gestión de Suscripciones (CRUD)
- [ ] **Listar:** Mostrar todas las suscripciones activas en tarjetas visuales.
- [ ] **Crear:** Formulario para agregar una nueva suscripción.
- [ ] **Editar:** Posibilidad de modificar el precio, nombre o la fecha de pago.
- [ ] **Eliminar:** Botón para remover una suscripción de la lista.

### 2. Lógica de Negocio
- [ ] **Cálculo de Totales:** Mostrar un encabezado con el **Gasto Total Mensual Estimado**.
- [ ] **Normalización de Frecuencia:**
    - Si una suscripción es *Mensual*, se suma el precio tal cual.
    - Si una suscripción es *Anual*, el sistema debe dividir el costo entre 12 para sumarlo al promedio mensual.
- [ ] **Conversión de Moneda:**
    - El sistema debe permitir entradas en **USD** y **HNL**.
    - Para el cálculo del total, todo debe convertirse a una sola moneda base (ej. convertir USD a HNL usando una tasa fija, ej: 26).

---

## Estructura del Proyecto Sugerida

```text
src/
├── components/
│   ├── SubscriptionCard.vue    # Componente de presentación (Props + Emits)
│   ├── SubscriptionForm.vue    # Formulario para Crear/Editar (v-model)
│   └── SubscriptionList.vue    # Contenedor principal de la lista
├── composables/
│   └── useSubscriptions.ts     # Lógica de estado (ref) y cálculos (computed)
├── types/
│   └── Subscription.ts         # Interfaces y Tipos (Currency, Frequency)
├── App.vue
└── main.ts