<template>
  <div class = "body">
    <h1 class = "result-header"> {{ yelpResult }}</h1>

    <button v-on:click = "searchAgain" class = "btn-secondary" value = "SEARCH AGAIN">
      <p> SEARCH AGAIN </p>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

// function facebookSearch() {
//   FB.api(
//     '/search',
//     'GET',
//     {"type":"place","q":"cafe","center":"40.7304,-73.9921","distance":"1000","fields":"name,id","access_token": this.fbKey|this.fbSecret},
//     function(response) {
//       alert(JSON.stringify(response));
//     }
//   );
// }
// window.onload = function() {
//   facebookSearch();
// }

// console.log(fbKey);
//
// &client_id=' +
// this.yelpKey + '&client_secret=' + this.yelpSecret

export default {
  name: 'Results',
  data () {
    return {
      yelpResult: "",
      fbResults: [],
      yelpToken: ""
    }
  },
  computed: {
    ...mapGetters([
      'getQuery',
      'getCoords',
      'getStay'
    ])
  },
  methods: {
    ...mapActions([

    ]),
    yelpSearch: function () {
      axios.post('http://localhost:4000/yelpSearch',{
      data: {
        query: this.getQuery,
        coords: this.getCoords,
        stay: this.getStay
      }})
      .then(response => {
        console.log(response.data);
        this.yelpResult = response.data;
      })
      .catch(e => {
        console.log(e);
      });
    },
    searchAgain: function () {
      this.$router.push('/');
    }
  },
  mounted() {
    this.yelpSearch();
  }
}
</script>

<style lang = "scss" scoped>
  .result-header {
    min-height: 96px;
  }
</style>
