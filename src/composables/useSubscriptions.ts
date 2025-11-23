import { ref, computed, onMounted } from "vue";
import type { Subscription } from "../types/Subscription";

const EXCHANGE_RATE = 26; // Tasa fija USD a HNL
const API_URL = "http://localhost:3000/api/subscriptions";

export function useSubscriptions() {
  const subscriptions = ref<Subscription[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const monthlyTotal = computed(() => {
    return subscriptions.value.reduce((total, sub) => {
      let monthlyPrice = sub.price;

      if (sub.frequency === "annual") {
        monthlyPrice = sub.price / 12;
      }

      if (sub.currency === "USD") {
        monthlyPrice = monthlyPrice * EXCHANGE_RATE;
      }

      return total + monthlyPrice;
    }, 0);
  });

  const loadSubscriptions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar suscripciones");
      }
      subscriptions.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error loading subscriptions:", err);
    } finally {
      loading.value = false;
    }
  };

  const addSubscription = async (subscription: Omit<Subscription, "id">) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear suscripción");
      }

      const newSubscription = await response.json();
      subscriptions.value.push(newSubscription);
      return newSubscription;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error adding subscription:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateSubscription = async (
    id: string,
    updates: Omit<Subscription, "id">
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar suscripción");
      }

      const updatedSubscription = await response.json();
      const index = subscriptions.value.findIndex((sub) => sub.id === id);
      if (index !== -1) {
        subscriptions.value[index] = updatedSubscription;
      }
      return updatedSubscription;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error updating subscription:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteSubscription = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar suscripción");
      }

      subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error deleting subscription:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadSubscriptions();
  });

  return {
    subscriptions,
    monthlyTotal,
    loading,
    error,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    loadSubscriptions,
  };
}
