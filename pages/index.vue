<template>
<div class="relative">
  <div class="h-[100vh] flex arrow"></div>
  <div class=" text-white absolute h-[25rem] lg:top-[11rem] top-[14rem]  lg:left-24 left-10 z-10 content-box ">
    <h1 class="title uppercase mb-4 text-[3rem] md:text-[4rem] lg:text-[5rem] ">Fabulous<span class="text-[#ff8e01] "> Footwear</span></h1>
    <p class="text  text-xl lg:text-4xl  mb-12">Unleash Your Style with Every Step</p>
    <NuxtLink class="btn py-5 px-16 bg-[#ff8e01] hover:bg-[#0651a4] text-xl uppercase font-medium rounded-full" to="/products">
      Explore
    </NuxtLink>
  </div>
    <img class=" lg:w-[80%]  w-[100%]  object-contain z-5 absolute lg:top-12 md:top-[23rem]  top-[18rem] right-0 h-[40rem] image" src="../public/image/sniker.png" alt="">
  </div>
</template>

<script setup>

</script>

<style>
.arrow {
  background-color: #090d10;
  clip-path: polygon(0% 20%, 40% 20%, 40% 0%, 100% 50%, 40% 100%, 40% 80%, 0% 80%);
  background-size: cover;

}
.image {
  animation: moveInLeft 1s ease-out;
}
.title {
  animation: moveInLeft 1s ease-out;
}
.text {

  animation: moveInRight 1s ease-out;
}
.btn {
  animation: moveInBottom 1s ease-out;
}
.btn:hover {
  transform: translateY(1px);
  transition: 0.5s ease-out;
}

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }
  80% {
    transform: translate(2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }
  80% {
    transform: translate(-2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}


</style>