<template>
  <div>HEY ITS ME MR MEESEICS</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'



export default {
  name: 'Results',
  data () {
    return {
      optionOne: "Chill",
      optionTwo: "Stay",
      coordinates: "he"
    }
  },
  computed: {
    ...mapGetters([
      'getQuery',
      'getCoord'
    ])
  },
  methods: {
    ...mapActions([
      'updateQuery',
      'updateCoord'
    ])
  }
}
</script>
