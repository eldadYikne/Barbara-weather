<template>
  <div>
    <Suspense>
        <async-city-view/>
        <template #fallback>
          <city-preview-skeleton/>
        </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "./AsyncCityView.vue";
</script>

