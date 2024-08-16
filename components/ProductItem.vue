<template>
  <div class="w-full flex flex-col items-center border rounded-lg shadow-lg p-5 mb-8 shadow-1">
    <img :src="product.imageUrl" :alt="product.name" class="w-48 h-48 object-cover mb-4">
    <h3 class="product-name text-xl font-semibold mb-2">{{ product.name }}</h3>
    <p class="product-price text-lg font-medium text-gray-700 mb-4">${{ product.price }}</p>
     <Raiting :quantity='product.averageRating' :value="product.averageRating" color="#ff8e01"/>
    <NuxtLink :to="`/products/${product.id}`">
      <button class="bg-black text-white font-bold py-2 px-8 rounded">View Details</button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">



interface Product {
  id: string
  name: string
  price: string
  description: string
  imageUrl: string
  averageRating: number
  gender: string
}


const props = defineProps<{ product: Product }>()
</script>

<style scoped>
.shadow-1{
  box-shadow: 0 2px 5px #888;
}
</style>