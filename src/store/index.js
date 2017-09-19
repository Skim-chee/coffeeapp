import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Success/Error functions for geolocating user
function getCoord (pos) {
  location = pos.coords.latitude + "," + pos.coords.longitude;
}
function getDenied (err) {
  console.log(':\'( ' + err.message);
}

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
    location: "-74.013004303,40.6320631246|-73.8527584076,40.7759918046"
  },
  mutations: {
    update_query (state, desc) {
      state.query = desc
    },

    update_coord (state, pos) {
      state.location = pos
    }
  },
  actions: {
    updateQuery (context, desc) {
      context.commit('update_query', desc)
    },

    updateCoord (context, pos) {
      if (pos == "getNew") {
        getPosition(function (coords) {
          pos = coords;
          context.commit('update_coord', pos)
        });
      } else {
        context.commit('update_coord', pos)

      }
    }
  },
  getters: {
    getQuery(state) {
      return state.query
    },

    getCoords(state) {
      return state.location
    }
  }

})

export default store
