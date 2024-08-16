<template>
  <div id="nav-bar" class="flex w-full items-center justify-between border-b border-gray-300 h-20 px-8">
    <NuxtLink to="/" id="home-link" class="text-black text-xl uppercase no-underline hover:text-[#ff8e01] border-none">Fabulous Footwear</NuxtLink>
    <div class="flex gap-8 items-center">
      <NuxtLink to="/products" id="products-link" class="text-black text-base hover:text-[#ff8e01] uppercase no-underline">Products</NuxtLink>
      <NuxtLink to="/cart" id="cart-link" class="relative text-black text-base uppercase no-underline hover:text-[#ff8e01]">
        Shopping Cart
        <span v-if="cartQuantity > 0" class="absolute -top-2 -right-3 bg-[#ff8e01] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {{ cartQuantity }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const cartQuantity = ref<number>(0);

const updateCartQuantity = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { quantity: number }[];
  cartQuantity.value = cart.reduce((total, item) => total + item.quantity, 0);
};

onMounted(() => {
  updateCartQuantity();
  window.addEventListener('storage', updateCartQuantity);
});


onUnmounted(() => {
  window.removeEventListener('storage', updateCartQuantity);
});
</script>
