import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

// Error functions for geolocating user
function getDenied (err) {
  console.log(':\'( ' + err.message);
}

// Gets users position using html5 geolocater
// returns var coords through callback
function getPosition (callback) {
  navigator.geolocation.watchPosition(
    function (position) {

      var coords = position.coords.latitude + "," + position.coords.longitude;
      callback(coords);
    }, getDenied, {maximumAge: Infinity, timeout: 5000}
  )
}


const store = new Vuex.Store({
  state: {
    query : "coffee nice atmosphere",
    location: "-74.013004303,40.6320631246|-73.8527584076,40.7759918046",
    yelpToken: ""
  },
  mutations: {
    update_query (state, desc) {
      state.query = desc
    },
    update_coord (state, pos) {
      state.location = pos
    },
    update_token (state, token) {
      state.yelpToken = token
    }
  },
  actions: {
    updateQuery (context, desc) {
      context.commit('update_query', desc)
    },
    updateCoords (context, pos) {
      if (pos == "getNew") {
        // Uses a callback function to retrieve coords
        getPosition(function (coords) {
          pos = coords;
          context.commit('update_coord', pos)
        });
      } else {
        context.commit('update_coord', pos)
      }
    },
    updateToken (context, token) {
      context.commit('update_token', token)
    }
  },
  getters: {
    getQuery(state) {
      return state.query
    },
    getCoords(state) {
      return state.location
    },
    getToken(state) {
      return state.yelpToken
    }
  },
  // Allows the state to persist through refresh by setting cookies
  plugins: [
    createPersistedState({
      stoage: {
        getItem: key => Cookies.getJSON(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true})
      }
  })]

})

export default store
