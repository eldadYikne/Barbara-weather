<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search for city ot state"
        @input="getSearchResults"
        class="
          py-2
          px-1
          w-full
          bg-transparent
          border-b
          focus:border-weather-secondary
          focuse:
          outline-none
          focus:shadow-[0px_1px_0_0_#004E71]
        "
        v-model="searchQuery"
      />
      <Transition name="search">
        <ul
          v-if="mapboxResults"
          class="
            absolute
            bg-weather-secondary
            text-white
            w-full
            shadow-md
            py-2
            px-1
            top-[66px]
          "
        >
          <p v-if="errorMsg">Sorry, somthing wrong, try again.</p>
          <p v-if="!errorMsg && mapboxResults.length === 0">
            No results match, try different term.
          </p>

          <li
            v-for="searchResulte in mapboxResults"
            :key="searchResulte.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResulte)"
          >
            {{ searchResulte.place_name }}
          </li>
        </ul>
      </Transition>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <city-list />
        <template #fallback>
        <city-preview-skeleton/>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const searchQuery = ref("");
const router = useRouter();
const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const mapboxResults = ref(null);
const queryTimeout = ref(null);
const errorMsg = ref(null);
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        )
        mapboxResults.value = result.data.features;
      } catch (err) {
        errorMsg.value = true;
      }
      return;
    }
    mapboxResults.value = null;
  }, 300);
};
</script>

<style lang="scss" scoped>
.search-enter-active {
  transition: all 0.3s ease-out;
}
.search-leave-active {
  transition: all 0.5s cubic-bezier(0.5, 0.5, 0.8, 1);
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>