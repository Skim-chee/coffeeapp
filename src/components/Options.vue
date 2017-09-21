
<template>
  <div id = "options" class="body">

    <form id = "option-form" v-on:submit= "submit">
      <div id = "selection">
        <p>What type of day is it?</p>
        <div class = "btn-set">
          <input class = "btn-option" id = "chill" value = "Chill" type = "radio" v-model = "optionOne">
          <label class = "btn-image chill" for = "chill"></label>

          <input  class = "btn-option" id = "productive" value = "Productive"  type = "radio" v-model = "optionOne">
          <label class = "btn-image productive" for = "productive"></label>
        </div>

        <p>Feeling adventurous?</p>
        <div class = "btn-set">
          <input class = "btn-option" id = "stay" value = "Stay"  type = "radio" v-model = "optionTwo">
          <label class = "btn-image stay" for = "stay"></label>

          <input class = "btn-option" id = "go" value = "Go" type = "radio" v-model = "optionTwo">
          <label class = "btn-image go" for = "go"></label>
        </div>

        <span> Checked: {{ optionOne }}, {{ optionTwo }} </span>
      </div>

      <button class = "btn-primary" type = "submit" value = "FIND CAFE">
        <p> FIND CAFE </p>
      </button>
    </form>

  </div>
</template>

<script>
import axios from 'axios';
import siteConfig from '../assets/mixins/siteConfig.js';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Options',
  data () {
    return {
      optionOne: "Chill",
      optionTwo: "Stay"
    }
  },
  mixins: [ siteConfig ],
  methods: {
    ...mapActions([
      'updateQuery',
      'updateCoords',
      'updateToken'
    ]),
    submit: function(e){
      e.preventDefault();
      if (this.$data.optionOne == "Chill") {
        this.updateQuery("coffee nice atmosphere");
      } else {
        this.updateQuery("coffee, wifi, outlets");
      }

      if (this.$data.optionTwo == "Stay") {
        this.updateCoords("getNew");
        // this.updateCoord(pos);
      } else {
        this.updateCoords("-74.013004303,40.6320631246|-73.8527584076,40.7759918046");
      }

      this.$router.push('/results');
    },
    yelpAuth: function() {
      // Data passed into axios to gain yelp access token
      let formData = new FormData();
      formData.append('client_id', this.yelpKey);      formData.append('client_secret', this.yelpSecret);
      formData.append('grant_type', 'client_credentials');


      axios.post('https://api.yelp.com/oauth2/token', formData)
      .then(response => {
        this.updateToken(response.data.access_token);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  mounted () {
    this.yelpAuth();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss" scoped>

@import "./src/assets/styles/vars.scss";

@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
#option-form {
  width: 90%;
  display: flex;
  flex-direction: column;

  @include desktop {
    width: 512px;
  }
}

#selection {
  input {
    -webkit-appearance:none;
     -moz-appearance:none;
          appearance:none;
          display: none;
  }

  input:checked + .btn-image {
    -webkit-filter: none;
       -moz-filter: none;
            filter: none;
  }
}

/*Styles option buttons*/

.btn-set {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 16px;
}

.btn-image {
  cursor:pointer;
  background-size:contain;
  background-repeat:no-repeat;
  display:inline-block;
  width:108px;
  height: 108px;
  -webkit-transition: all 250ms ease-in;
        -moz-transition: all 250ms ease-in;
             transition: all 250ms ease-in;
     -webkit-filter: brightness(1.5) grayscale(1) opacity(.5);
        -moz-filter: brightness(1.5) grayscale(1) opacity(.5);
             filter: brightness(1.5) grayscale(1) opacity(.5);


  &:hover, &:active {
    -webkit-filter: brightness(1) grayscale(0) opacity(.5);
       -moz-filter: brightness(1) grayscale(0) opacity(.5);
            filter: brightness(1) grayscale(0) opacity(.5);
  }

  &:not(:active) {
    animation: pulse 1s;
  }


}

.chill {
  background-image: url("../assets/Button/Icon/Chill@2x.png");
}
.productive {
  background-image: url("../assets/Button/Icon/Productive@2x.png");
}
.stay {
  background-image: url("../assets/Button/Icon/Stay@2x.png");
}
.go {
  background-image: url("../assets/Button/Icon/Go@2x.png");
}

</style>
