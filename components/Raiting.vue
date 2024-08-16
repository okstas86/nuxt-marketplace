<template>
  <div class="rating mb-4">
    <span v-for="star in 5" :key="star">
      <i class="text-xl mr-1" :class="getStarClass(star)" :style="{ color }"></i>
    </span>
    <span>({{ quantity }})</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: "gold",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getStarClass(star) {
      if (this.value >= star) {
        return "fas fa-star";
      } else if (this.value >= star - 0.5) {
        return "fas fa-star-half-alt";
      } else {
        return "far fa-star";
      }
    },
  },
};
</script>


