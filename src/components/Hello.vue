
<template>
  <div class="body">
    <h1>Stumptown Coffee</h1>

    <form v-on:submit= "submit">
      <div id = "selection">
        <p>What type of day is it?</p>
        <div class = "button-set">
          <input id = "chill" name = "day" value = "Chill"  type = "radio" v-model = "optionOne">
          <label class = "btn-image chill bounce" for = "chill"></label>

          <input id = "productive" name = "day" value = "Productive"  type = "radio" v-model = "optionOne">
          <label class = "btn-image productive" for = "productive"></label>
        </div>

        <p>Feeling adventurous?</p>
        <div class = "button-set">
          <input checked = "checked" id = "stay" name = "distance" value = "Stay"  type = "radio" v-model = "optionTwo">
          <label class = "btn-image stay" for = "stay"></label>

          <input id = "go" name = "distance" value = "Go"  type = "radio" v-model = "optionTwo">
          <label class = "btn-image go" for = "go"></label>
        </div>

        <span> Checked: {{ optionOne }}, {{ optionTwo }} </span>

      </div>

      <button class = "btn-primary" type = "submit" value = "FIND CAFE">
        <p> FIND CAFE </p>
      </button>
    </form>

    <div id="instafeed">
    </div>



  </div>
</template>

<script>
import Instafeed from 'instafeed.js'

let query = "coffee nice atmosphere";

export default {
  name: 'hello',
  data () {
    return {
      optionOne: "Chill",
      optionTwo: "Stay"
    }
  },
  methods: {
    submit: function(){
      if (this.$data.optionOne == "Chill") {

      } else {
        query = "coffee wifi outlets";

      }

      if (this.$data.optionTwo == "Stay") {

      } else {

      }
    }
  }
}
 var feed = new Instafeed({
       get: 'tagged',
       tagName: 'awesome',
       clientId: '53726708.1677ed0.de68285baef341d580f7b9ea226cf534'
   });
   feed.run();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss" scoped>
@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.body {
  align-self: center;

  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

#selection {
  width: 800px;

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

.button-set {
  display: flex;
  justify-content: space-between;
}

.btn-image {
  cursor:pointer;
  background-size:contain;
  background-repeat:no-repeat;
  display:inline-block;
  width:108px;
  height: 108px;
  -webkit-transition: all 300ms ease-in;
        -moz-transition: all 300ms ease-in;
             transition: all 300ms ease-in;
     -webkit-filter: brightness(1.5) grayscale(1) opacity(.5);
        -moz-filter: brightness(1.5) grayscale(1) opacity(.5);
             filter: brightness(1.5) grayscale(1) opacity(.5);

  &:hover, &:active {
    -webkit-filter: brightness(1) grayscale(0) opacity(.5);
       -moz-filter: brightness(1) grayscale(0) opacity(.5);
            filter: brightness(1) grayscale(0) opacity(.5);
  }
  &:not(:active){
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
