<template>
  <div class = "body">
    <h1 class = "result-header"> {{ yelpResult }}</h1>
    <div class = "result-button-set">

        <a  class = "btn-primary" :href= "yelpURL" target = "_blank"> YELP </a>

        <a class = "btn-primary" :href= "mapURL" target = "_blank"> MAP </a>
    </div>
    <table>
      <tbody>
        <tr v-for = "image in imageResults">
          <td>
            <img v-bind:src= 'image'>
          </td>
        </tr>
      </tbody>
    </table>

    <button v-on:click = "searchAgain" class = "btn-secondary" value = "SEARCH AGAIN">
      <p> SEARCH AGAIN </p>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Results',
  data () {
    return {
      yelpResult: "",
      yelpURL: "",
      mapURL: "",
      imageResults: []
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
    yelpSearch: function () {
      axios.post('https://thecitythatneversleeps.me/yelpSearch',{
      data: {
        query: this.getQuery,
        coords: this.getCoords,
        stay: this.getStay
      }})
      .then(response => {
        this.yelpResult = response.data.name;
        // If return with error, stop the rest of search
        if (this.yelpResult != "Could not find :(") {
          this.yelpURL = response.data.url;
          this.mapURL = "https://www.yelp.com/map/" + this.yelpURL.split('/')[4];
          let curCoords = response.data.coordinates.latitude + "," + response.data.coordinates.longitude;
          // uses resulting business name and location to pass to fbSearch
          axios.post('https://thecitythatneversleeps.me/fbSearch',{
          data: {
            name: this.yelpResult,
            coords: curCoords
          }})
          .then(r => {
            this.imageResults = r.data;
          })
          .catch(e => {
            console.log(e);
          });
        }
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

  @import "./src/assets/styles/vars.scss";

  .result-header {
    min-height: 96px;
  }

  button a {
    font-size: 17px;
    font-weight: 600;
    color: $primary;

    &:visited, &:active {
      color: $primary;
    }
    &:hover {
      color: $white;
    }

    display: block;
    height: 100%;
    width: 100%;
    line-height: 44px;

    @include desktop {
      line-height: 60px;
    }
  }

  .result-button-set {
    @include flexbox();
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    margin-top: 16px;

    @include desktop {
      flex-direction: row;
      width: 616px;
      margin-top: 32px;
    }

    .btn-primary {
      margin-top: 0;
      margin-bottom: 16px;
    }
  }

  tbody {
    @include flexbox();
    flex-wrap: wrap;

    margin-top: 24px;
    width: 100%;
    height: 100%;
    min-height: 316px;

    @include desktop {
      margin-top: 48px;
      width: 600px;
      height: 600px;
    }

    tr {
      width: 33.3%;
    }
    img {
      width: 100%;
    }
  }
</style>
