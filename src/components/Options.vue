
<template>
  <div id = "options" class="body">

    <form id = "option-form" v-on:submit= "submit">
      <div id = "selection">
        <p>What type of day is it?</p>
        <div class = "btn-set">
          <div class = "btn-option" >
            <input id = "chill" value = "Chill" type = "radio" v-model = "optionOne">
            <label class = "btn-image chill" for = "chill"></label>
            <h2> Chill </h2>
            <p> nice atmosphere </p>
          </div>
          <div class = "btn-option">
            <input id = "productive" value = "Productive"  type = "radio" v-model = "optionOne">
            <label class = "btn-image productive" for = "productive"></label>
            <h2> Productive </h2>
            <p> wifi + outlets </p>
          </div>
        </div>

        <p>Feeling adventurous?</p>
        <div class = "btn-set">
          <div class = "btn-option">
            <input class = "btn-option" id = "stay" value = "Stay"  type = "radio" v-model = "optionTwo">
            <label class = "btn-image stay" for = "stay"></label>
            <h2> No </h2>
            <p> let's stay near </p>
          </div>
          <div class = "btn-option">
            <input class = "btn-option" id = "go" value = "Go" type = "radio" v-model = "optionTwo">
            <label class = "btn-image go" for = "go"></label>
            <h2> Yes </h2>
            <p> let's explore </p>
          </div>
        </div>
      </div>

      <button class = "btn-primary" type = "submit" value = "FIND CAFE">
        <p> FIND CAFE </p>
      </button>
    </form>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex'

// Holds state of option to allow persistance
var optOne = "Chill";
var optTwo = "Stay";

export default {
  name: 'Options',
  data () {
    return {
      optionOne: optOne,
      optionTwo: optTwo
    }
  },
  methods: {
    ...mapActions([
      'updateQuery',
      'updateCoords',
      'updateStay'
    ]),
    submit: function(e){
      e.preventDefault();
      if (this.$data.optionOne == "Chill") {
        optOne = "Chill";
        this.updateQuery("coffee, atmosphere");
      } else {
        optOne = "Productive";
        this.updateQuery("coffee, wifi, outlets, study");
      }
      // Resets coordinates for Go -> Stay case
      this.updateCoords("");

      if (this.$data.optionTwo == "Stay") {
        optTwo = "Stay";
        // Makes a call to getNew function for server request
        this.updateCoords("getNew");
        this.updateStay(true);
      } else {
        optTwo = "Go";
        this.updateCoords("40.725925,-73.909149");
        this.updateStay(false);
      }

      this.$router.push('/results');
    }
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
  @include flexbox();
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
    & + h2 {
      color: $primary;
      border-bottom: 2px solid $primary;
      & + p {
        color: $off-black;
      }
    }
  }
}

/*Styles option buttons*/

.btn-set {
  @include flexbox();
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 16px;
}

.btn-option {
  @include flexbox();
  flex-direction: column;
  align-items: center;
  text-align: center;
  h2, p {
    color: $gray;
  }
  h2 {
    margin-top: 8px;
    border-bottom: 2px solid transparent;
  }
  p {
    margin-top: 4px;
    font-weight: 100;
    font-size: 14px;
    letter-spacing: .7px;
  }
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
