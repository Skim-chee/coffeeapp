<template>
  <div class = "body">
    <h1 class = "result-header"> {{ yelpResult }}</h1>

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
        this.yelpResult = response.data.name;
        let curCoords = response.data.coordinates.latitude + "," + response.data.coordinates.longitude;
        // uses resulting business name and location to pass to fbSearch
        axios.post('http://localhost:4000/fbSearch',{
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

  tbody {
    margin-top: 48px;


    width: 600px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;

    tr {
      width: 33%;
    }
    img {
      width: 100%;
    }
  }
</style>
