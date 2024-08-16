<template>
  <div v-if="product" class="max-w-4xl mx-auto py-8">
    <div class="flex flex-col md:flex-row">
      <div class="flex-shrink-0">
        <img :src="product.imageUrl" :alt="product.name" class="w-full h-auto md:w-96" />
      </div>
      <div class="mt-6 md:mt-0 md:ml-8">
        <h1 class="text-2xl font-bold">{{ product.name }}</h1>
        <h3 id="price" class="text-xl font-semibold text-gray-800 mt-2">${{ product.price }}</h3>
        <p class="my-4">Average rating: {{ product.averageRating }}</p>
        <Raiting :quantity="product.averageRating" :value="product.averageRating" color="#ff8e01"/>
        <button 
          @click="addToCart"
          class="mt-2 w-full py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600">
          {{ showSuccessMessage ? 'Successfully added item to cart!' : 'Add to Cart' }}
        </button>
        <h4 class="text-lg font-semibold mt-8">Description:</h4>
        <p class="mt-2">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Raiting from '~/components/Raiting.vue'

interface Product {
  id: string
  name: string
  price: string
  description: string
  imageUrl: string
  averageRating: number
}

const product = ref<Product | null>(null)
const showSuccessMessage = ref(false)

const route = useRoute()
const productId = route.params.id as string

const fetchProduct = async () => {
  try {
    const response = await fetch(`/api/products/${productId}`)
    if (!response.ok) {
      throw new Error('Product not found')
    }
    product.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch product:', error)
    
  }
}

const addToCart = async () => {
  if (!product.value) {
    console.error('No product selected')
    return
  }

  try {
    const response = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.value.id })
    })

    const result = await response.json()
    console.log('Result from server:', result)

    if (result.success) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingProductIndex = cart.findIndex((item: { productId: string }) => item.productId === product.value.id)

      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1
      } else {
        cart.push({ productId: product.value.id, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('storage'))
      showSuccessMessage.value = true
      setTimeout(() => showSuccessMessage.value = false, 3000)
      navigateTo('/products') 
    } else {
      console.error('Error adding to cart:', result.error)
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
/* Добавьте стили, если нужно */
</style>
