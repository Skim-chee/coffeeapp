<template>
  <div>HEY ITS ME MR MEESEICS</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import siteConfig from '../assets/mixins/siteConfig.js';

function facebookSearch() {
  FB.api(
    '/search',
    'GET',
    {"type":"place","q":"cafe","center":"40.7304,-73.9921","distance":"1000","fields":"name,id","access_token":"2001020613450573|2f8847a44f310a21fc0f5635cfd63618"},
    function(response) {
      // alert(JSON.stringify(response));
    }
  );
}
window.onload = function() {
  facebookSearch();
}

// console.log(fbKey);

export default {
  name: 'Results',
  mixins: [ siteConfig ],
  data () {
    return {
      optionOne: "Chill",
      optionTwo: "Stay",
      coordinates: "he",
    }
  },
  computed: {
    ...mapGetters([
      'getQuery',
      'getCoords'
    ])
  },
  methods: {
    ...mapActions([
      'updateQuery',
      'updateCoords'
    ])
  }
}
</script>
