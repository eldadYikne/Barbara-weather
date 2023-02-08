<template>
  <div v-for="city in savedCities" :key="city.id">
    <city-preview
      :imageUrlCity="imageUrlCity"
      :city="city"
      @click="goToCity(city)"

    />
  </div>
</template>

<script  setup>
import { ref } from "vue";
import axios from "axios";
import CityPreview from "./CityPreview.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const savedCities = ref([]);
const imageUrlCity = ref([]);


const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const requests = [];
  savedCities.value.forEach((city) => {

    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.cords.lat}&lon=${city.cords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      )
    );
  });
  const weatherData = await Promise.all(requests);
  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};
await getCities();
const router = useRouter();
const goToCity = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.cords.lat, lng: city.cords.lng },
  });
};

</script>

