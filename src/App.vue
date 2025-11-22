<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
  >
    <div class="text-center">
      <h1 class="text-5xl font-bold text-gray-800 mb-8">Hola mundo</h1>
      <button
        type="button"
        @click="count++"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        Count is {{ count }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
