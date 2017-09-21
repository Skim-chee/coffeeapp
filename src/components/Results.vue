<template>
  <div>
  <div>HEY ITS ME MR MEESEICS</div>
  <p>{{ yelpSearch() }} </p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import siteConfig from '../assets/mixins/siteConfig.js';

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
  mixins: [ siteConfig ],
  data () {
    return {
      yelpResults: [],
      fbResults: [],
      yelpToken: ""
    }
  },
  computed: {
    ...mapGetters([
      'getQuery',
      'getCoords',
      'getToken'
    ])
  },
  methods: {
    ...mapActions([

    ]),
    yelpSearch: function () {
      axios.get('https://api.yelp.com/v3/businesses/search',{
      headers: {
        'Authorization' : 'Bearer ' + this.getToken
      }})
      .then(response => {

      })
      .catch(e => {
        console.log(e);
      });
    }
  }
}
</script>
