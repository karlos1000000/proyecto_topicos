<script setup lang="ts">
import type { Subscription } from "../types/Subscription";

interface Props {
  subscription: Subscription;
}

defineProps<Props>();

const emit = defineEmits<{
  edit: [id: string];
  delete: [id: string];
}>();
</script>

<template>
  <div
    class="bg-white shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
  >
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-green-900 mb-2">
          {{ subscription.name }}
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-green-700">
            {{ subscription.currency === "USD" ? "$" : "L" }}
            {{ subscription.price.toFixed(2) }}
          </span>
          <span
            class="px-2 py-1 text-xs font-medium"
            :class="
              subscription.frequency === 'monthly'
                ? 'bg-green-100 text-green-800'
                : 'bg-emerald-100 text-emerald-800'
            "
          >
            {{ subscription.frequency === "monthly" ? "Mensual" : "Anual" }}
          </span>
        </div>
        <p class="text-sm text-green-600 mt-2">
          Próximo pago: {{ subscription.paymentDate }}
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="emit('edit', subscription.id)"
          class="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
        >
          Editar
        </button>
        <button
          @click="emit('delete', subscription.id)"
          class="px-3 py-1 text-sm bg-green-800 hover:bg-green-900 text-white transition-colors duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
