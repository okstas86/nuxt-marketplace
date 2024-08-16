<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar/>
    	<main >
				<NuxtPage />
			</main>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
</script>


