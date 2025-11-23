<script setup lang="ts">
import { ref } from "vue";
import SubscriptionCard from "./SubscriptionCard.vue";
import SubscriptionForm from "./SubscriptionForm.vue";
import { useSubscriptions } from "../composables/useSubscriptions";
import type { Subscription } from "../types/Subscription";

const {
  subscriptions,
  monthlyTotal,
  loading,
  error,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} = useSubscriptions();

const showForm = ref(false);
const editingSubscription = ref<Subscription | null>(null);

const handleAdd = () => {
  editingSubscription.value = null;
  showForm.value = true;
};

const handleEdit = (id: string) => {
  const sub = subscriptions.value.find((s) => s.id === id);
  if (sub) {
    editingSubscription.value = sub;
    showForm.value = true;
  }
};

const handleDelete = async (id: string) => {
  if (confirm("¿Estás seguro de que quieres eliminar esta suscripción?")) {
    try {
      await deleteSubscription(id);
    } catch (err) {
      alert("Error al eliminar la suscripción");
    }
  }
};

const handleSubmit = async (subscriptionData: Omit<Subscription, "id">) => {
  try {
    if (editingSubscription.value) {
      await updateSubscription(editingSubscription.value.id, subscriptionData);
    } else {
      await addSubscription(subscriptionData);
    }
    showForm.value = false;
    editingSubscription.value = null;
  } catch (err) {
    alert("Error al guardar la suscripción");
  }
};

const handleCancel = () => {
  showForm.value = false;
  editingSubscription.value = null;
};
</script>

<template>
  <div class="w-full max-w-6xl mx-auto">
    <div class="bg-white shadow-lg p-6 mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-green-900 mb-2">
            Proyecto Tópicos Especiales - IS906
          </h1>
          <p class="text-green-700">Carlos Osegueda - 20212030669</p>
        </div>
      </div>
    </div>

    <div class="bg-white shadow-lg p-6 mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-green-900 mb-2">SubTracker</h1>
          <p class="text-green-700">
            Gestiona tus suscripciones y gastos recurrentes
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-green-600 mb-1">
            Gasto Total Mensual Estimado
          </p>
          <p class="text-4xl font-bold text-green-800">
            L {{ monthlyTotal.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <button
        v-if="!showForm"
        @click="handleAdd"
        class="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 shadow-md transition-all duration-200"
      >
        + Agregar Nueva Suscripción
      </button>
    </div>

    <div v-if="showForm" class="mb-6">
      <SubscriptionForm
        :subscription="editingSubscription || undefined"
        :is-editing="!!editingSubscription"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>

    <div v-if="error" class="bg-red-100 text-red-800 p-4 mb-6">
      <p class="font-semibold">Error: {{ error }}</p>
      <p class="text-sm mt-1">
        Asegúrate de que el servidor API esté corriendo en http://localhost:3000
      </p>
    </div>

    <div v-if="loading && subscriptions.length === 0" class="text-center py-12">
      <p class="text-green-700 text-lg">Cargando suscripciones...</p>
    </div>

    <div
      v-else-if="!loading && subscriptions.length === 0"
      class="text-center py-12"
    >
      <p class="text-green-700 text-lg">
        No hay suscripciones registradas. ¡Agrega tu primera suscripción!
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SubscriptionCard
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :subscription="subscription"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped></style>
