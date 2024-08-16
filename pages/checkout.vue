<template>
  <div id="checkout-page" class="p-4">
    <h1 class="text-xl border-b border-black mb-4 pb-4">Checkout</h1>
    <Modal :show="showModal" title="Payment Successful!" :message="modalMessage" duration="3000" />
    <div v-if="cartItems.length > 0">
      <h2 class="text-lg mb-4">Order Summary</h2>
      <div v-for="product in cartItems" :key="product.productId" class="flex items-center border-b border-gray-200 py-4">
        <img :src="product.imageUrl" alt="Product Image" class="h-24 w-24 object-cover mr-4" />
        <div class="flex-1">
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-gray-600">Price: ${{ product.price }}</p>
          <p class="text-gray-600">Quantity: {{ product.quantity }}</p>
        </div>
        <p>Total: ${{ product.price * product.quantity }}</p>
      </div>
      <h3 class="text-right mt-4 mb-8 text-xl font-medium">Total Price: ${{ totalPrice }}</h3>

      <div class="flex flex-wrap -mx-2">
      
        <div class="w-full md:w-1/2 px-2 mb-4">
          <h2 class="text-lg mb-4 font-medium">Shipping Details</h2>
          <form @submit.prevent="processPayment">
            <div class="mb-4">
              <label for="address" class="block mb-2">Address</label>
              <input v-model="shippingDetails.address" id="address" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <div class="mb-4">
              <label for="city" class="block mb-2">City</label>
              <input v-model="shippingDetails.city" id="city" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <div class="mb-4">
              <label for="postalCode" class="block mb-2">Postal Code</label>
              <input v-model="shippingDetails.postalCode" id="postalCode" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <div class="mb-4">
              <label for="country" class="block mb-2">Country</label>
              <input v-model="shippingDetails.country" id="country" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
          </form>
        </div>


        <div class="w-full md:w-1/2 px-2 mb-4">
          <h2 class="text-lg mb-4 font-medium">Payment Details</h2>
          <form @submit.prevent="processPayment">
            <div class="mb-4">
              <label for="card-number" class="block mb-2">Card Number</label>
              <input v-model="paymentDetails.cardNumber" id="card-number" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <div class="mb-4">
              <label for="expiration-date" class="block mb-2">Expiration Date</label>
              <input v-model="paymentDetails.expirationDate" id="expiration-date" type="text" class="w-full p-2 border border-gray-300" required placeholder="MM/YY" />
            </div>
            <div class="mb-4">
              <label for="cvv" class="block mb-2">CVV</label>
              <input v-model="paymentDetails.cvv" id="cvv" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <div class="mb-4">
              <label for="cardholder-name" class="block mb-2">Cardholder Name</label>
              <input v-model="paymentDetails.cardholderName" id="cardholder-name" type="text" class="w-full p-2 border border-gray-300" required />
            </div>
            <button type="submit" class="w-full my-4 py-2 bg-green-500 text-white hover:bg-green-600">Pay ${{ totalPrice }}</button>
          </form>
        </div>
      </div>
    </div>
    <p v-else class="mt-4 text-gray-600">Your cart is empty!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from '~/components/Modal.vue';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
}

const cartItems = ref<Product[]>([]);
const totalPrice = ref(0);
const showModal = ref(false);
const modalMessage = ref('');

const shippingDetails = ref<ShippingDetails>({
  address: '',
  city: '',
  postalCode: '',
  country: ''
});

const paymentDetails = ref<PaymentDetails>({
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  cardholderName: ''
});

const fetchCartItems = async () => {
  try {
    const productsResponse = await fetch('/api/products');
    const products = await productsResponse.json();

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cartItems.value = cart.map((cartItem: { productId: string; quantity: number }) => {
      const product = products.find((p: Product) => p.id === cartItem.productId);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    }).filter((item: Product | null) => item !== null) as Product[];

    calculateTotalPrice();
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

const calculateTotalPrice = () => {
  totalPrice.value = cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const processPayment = async () => {
  console.log('Processing payment with details:', paymentDetails.value);
  console.log('Shipping details:', shippingDetails.value);

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentDetails: paymentDetails.value,
        shippingDetails: shippingDetails.value,
        cartItems: cartItems.value,
        totalPrice: totalPrice.value,
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      modalMessage.value = 'Order number: ' + result.orderNumber;
      showModal.value = true;
      localStorage.removeItem('cart');
      cartItems.value = [];
      totalPrice.value = 0;
      window.dispatchEvent(new Event('storage'));
    } else {
      modalMessage.value = 'Payment failed: ' + result.message;
      showModal.value = true;
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    modalMessage.value = 'There was an error processing your payment.';
    showModal.value = true;
  }
};

onMounted(fetchCartItems);
</script>


