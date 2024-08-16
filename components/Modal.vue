<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-green-500 text-white p-6 rounded shadow-lg">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';


interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  duration: number;
}

const props = defineProps<ModalProps>();
const emits = defineEmits(['close']);

const visible = ref(props.show);


watch(() => props.show, (newValue) => {
  visible.value = newValue;
  if (newValue) {
    setTimeout(() => {
      visible.value = false;
      navigateTo('/'); 
    }, props.duration || 3000);
  }
});
</script>


