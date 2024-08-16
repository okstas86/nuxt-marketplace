<template>
  <div class="flex items-center border-b border-gray-200 py-4">
    <img :src="product.imageUrl" alt="Product Image" class="h-24 w-24 object-cover mr-4">
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-gray-600">Price: ${{ product.price }}</p>
      <p class="text-gray-600">Quantity: {{ product.quantity }}</p>
    </div>
    <button @click="handleRemoveFromCart" class="text-red-500 hover:text-red-700 mr-8">Remove</button>
  </div>
</template>

<script setup lang="ts">

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const props = defineProps<{
  product: Product;
}>();


const emit = defineEmits<{
  (event: 'remove-from-cart', productId: string): void;
}>();


const handleRemoveFromCart = () => {
  emit('remove-from-cart', props.product.id);
};
</script>

