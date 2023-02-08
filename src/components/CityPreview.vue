<template>
  <div
    class="
      flex
      py-6
      px-3
      bg-weather-secondary
      rounded-md
      shadow-md
      cursor-pointer
    "
    v-bind:style="{
      'background-image': 'url(' + image + ')',
      'background-repeat': 'no-repeat',
      'background-position': '50%',
      'background-size': 'cover',
    }"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap2">
      <p class="text-3xl self-end">
        {{
          (((Math.round(city.weather.main.temp) - 32) * 5) / 9).toFixed(0)
        }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{
            (((Math.round(city.weather.main.temp_max) - 32) * 5) / 9).toFixed(
              0
            )
          }}&deg;
        </span>
        <span class="text-xs">
          L:

          {{
            (((Math.round(city.weather.main.temp_min) - 32) * 5) / 9).toFixed(
              0
            )
          }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const image=ref(null)
const props= defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const getUrlImageCity =()=>{

  const currCity = store.state.cities.find(cityStore =>  cityStore.city === props.city.city);
  if (currCity) image.value = currCity.imageUrl
}
getUrlImageCity()
</script>

