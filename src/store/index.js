import { createStore } from 'vuex'
// Create a new store instance.


const storeOptions = {
    state() {
        return {
            count: 0,
            cities: JSON.parse(localStorage.getItem("citiesList")) || []
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        fetchImageUrl(state, { city }) {
           const cityIsExists= state.cities.find(cityStore =>  cityStore.city===city.city  )
           if(!cityIsExists){
               state.cities.push(city)
               localStorage.setItem("citiesList", JSON.stringify(state.cities));

           } 

        }
    },
    actions: {
        fetchImageUrl({ commit }, city) {
            commit('fetchImageUrl', { city })
        }
    }

}

const store = createStore(storeOptions)

export default store;