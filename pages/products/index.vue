<template>
  <div id="page-wrap" class="p-4 mx-auto max-w-7xl">
    <!-- Filter and Sort Controls -->
    <div class="mb-4 flex justify-between gap-8">
      <div class="flex flex-col gap-2 w-full sm:w-auto">
        <label for="gender" class="block text-lg font-semibold">Gender</label>
        <select v-model="selectedGender" id="gender" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm">
          <option value="">All</option>
          <option value="man">Men</option>
          <option value="woman">Women</option>
        </select>
      </div>

      <div class="flex flex-col gap-2 w-full sm:w-auto">
        <label for="sort" class="block text-lg font-semibold">Sort By</label>
        <select v-model="sortOption" id="sort" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductItem v-for="product in paginatedProducts" :key="product.id" :product="product"/>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-8">
      <button
        class="px-4 py-2 mx-1 border rounded-lg shadow-sm"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>
      <button
        class="px-4 py-2 mx-1 border rounded-lg shadow-sm"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProductItem from '~/components/ProductItem.vue';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  averageRating: number;
  gender: string;
}

const products = ref<Product[]>([]);
const selectedGender = ref<string>('');
const sortOption = ref<string>('price-asc');
const currentPage = ref<number>(1);
const itemsPerPage = 8;

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    products.value = await response.json();
  } catch (error) {
    console.error('Не удалось получить товары:', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return !selectedGender.value || product.gender === selectedGender.value;
  });
});

const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    switch (sortOption.value) {
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'rating':
        return b.averageRating - a.averageRating;
      default:
        return 0;
    }
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
