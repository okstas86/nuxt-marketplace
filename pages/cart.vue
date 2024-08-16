<template>
  <div id="page-wrap" class="p-4">
    <h1 class="text-xl border-b border-black mb-4 pb-4">Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <CartItem
        v-for="product in cartItems"
        :key="product.id"
        :product="product"
        @remove-from-cart="removeFromCart"
      />
    </div>
    <p v-else class="mt-4 text-gray-600">You haven't added anything to the cart!</p>
    <h3 id="total-price" class="text-right mt-4">Total: ${{ totalPrice.toFixed(2) }}</h3>
    <button @click="navigateTo('/checkout')" class="w-full mt-4 py-2 bg-blue-500 text-white hover:bg-blue-600">Proceed to Checkout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CartItem from '~/components/CartItem.vue';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const products = ref<Product[]>([]);
const cartItems = ref<CartItemType[]>([]);
const totalPrice = ref<number>(0);

const fetchCartItems = async () => {
  try {
   
    const productsResponse = await fetch('/api/products');
    products.value = await productsResponse.json();
    console.log('Fetched products:', products.value);

   
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Fetched cart from localStorage:', cart);

 
    cartItems.value = cart.map((cartItem: { productId: string, quantity: number }) => {
      const product = products.value.find(p => p.id === cartItem.productId);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    }).filter((item: Product | null): item is CartItemType => item !== null);

    
    calculateTotalPrice();
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

const calculateTotalPrice = () => {
  if (Array.isArray(cartItems.value)) {
    totalPrice.value = cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  } else {
    console.error('cartItems.value is not an array:', cartItems.value);
  }
};


onMounted(fetchCartItems);

const removeFromCart = async (productId: string) => {
  try {
   
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: { productId: string }) => item.productId === productId);

    if (existingProductIndex > -1) {
      if (cart[existingProductIndex].quantity > 1) {
        cart[existingProductIndex].quantity -= 1;
      } else {
        cart = cart.filter((item: { productId: string }) => item.productId !== productId);
      }
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));


    cartItems.value = cart.map((cartItem: { productId: string, quantity: number }) => {
      const product = products.value.find(p => p.id === cartItem.productId);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    }).filter((item: Product | null): item is CartItemType => item !== null);

   
    calculateTotalPrice();

 
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};
</script>

