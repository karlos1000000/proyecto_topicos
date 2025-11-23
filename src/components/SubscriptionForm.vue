<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Subscription, Currency, Frequency } from "../types/Subscription";

interface Props {
  subscription?: Subscription;
  isEditing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<{
  submit: [subscription: Omit<Subscription, "id">];
  cancel: [];
}>();

const name = ref("");
const price = ref(0);
const currency = ref<Currency>("USD");
const frequency = ref<Frequency>("monthly");
const paymentDate = ref("");

watch(
  () => props.subscription,
  (sub) => {
    if (sub) {
      name.value = sub.name;
      price.value = sub.price;
      currency.value = sub.currency;
      frequency.value = sub.frequency;
      paymentDate.value = sub.paymentDate;
    } else {
      name.value = "";
      price.value = 0;
      currency.value = "USD";
      frequency.value = "monthly";
      const today = new Date();
      paymentDate.value = today.toISOString().split("T")[0] || "";
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!paymentDate.value) {
    const today = new Date();
    paymentDate.value = today.toISOString().split("T")[0] || "";
  }
});

const handleSubmit = () => {
  if (!name.value || price.value <= 0 || !paymentDate.value) {
    alert("Por favor completa todos los campos correctamente");
    return;
  }

  emit("submit", {
    name: name.value,
    price: price.value,
    currency: currency.value,
    frequency: frequency.value,
    paymentDate: paymentDate.value,
  });

  name.value = "";
  price.value = 0;
  currency.value = "USD";
  frequency.value = "monthly";
  const today = new Date();
  paymentDate.value = today.toISOString().split("T")[0] || "";
};

const handleCancel = () => {
  emit("cancel");
  name.value = "";
  price.value = 0;
  currency.value = "USD";
  frequency.value = "monthly";
  const today = new Date();
  paymentDate.value = today.toISOString().split("T")[0] || "";
};
</script>

<template>
  <div class="bg-white shadow-lg p-6">
    <h2 class="text-2xl font-bold text-green-900 mb-6">
      {{ isEditing ? "Editar Suscripción" : "Nueva Suscripción" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-green-800 mb-1">
          Nombre del Servicio
        </label>
        <input
          v-model="name"
          type="text"
          required
          class="w-full px-4 py-2 border border-green-300 focus:outline-none focus:border-green-600"
          placeholder="Ej: Netflix, Spotify, Gimnasio..."
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-green-800 mb-1">
            Precio
          </label>
          <input
            v-model.number="price"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full px-4 py-2 border border-green-300 focus:outline-none focus:border-green-600"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-green-800 mb-1">
            Moneda
          </label>
          <select
            v-model="currency"
            class="w-full px-4 py-2 border border-green-300 focus:outline-none focus:border-green-600"
          >
            <option value="USD">USD ($)</option>
            <option value="HNL">HNL (L)</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-green-800 mb-1">
            Frecuencia
          </label>
          <select
            v-model="frequency"
            class="w-full px-4 py-2 border border-green-300 focus:outline-none focus:border-green-600"
          >
            <option value="monthly">Mensual</option>
            <option value="annual">Anual</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-green-800 mb-1">
            Fecha de Pago
          </label>
          <input
            v-model="paymentDate"
            type="date"
            required
            class="w-full px-4 py-2 border border-green-300 focus:outline-none focus:border-green-600"
          />
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 transition-colors duration-200"
        >
          {{ isEditing ? "Actualizar" : "Agregar" }}
        </button>
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-2 px-4 transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
