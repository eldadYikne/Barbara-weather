<template>
  components: { AnimatedPlaceholder },
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md"></div>
  <div class="flex flex-col flex-1 gap-2">
    <animated-placeholder class="max-w-(50%)"/>
    <animated-placeholder class="max-w-(40%)"/>
  </div>
  <div class="flex flex-col items-end flex-1 gap-2">
    <animated-placeholder class="max-w-(50px) w-full"/>
    <animated-placeholder class="max-w-(40%) w-full"/>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
 
