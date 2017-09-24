<template>
  <div id="app">
    <img v-on:click="goHome" id = "logo" src="./assets/logo@2x.png">
    <router-view></router-view>

    <footer>
      <div class = "footer-container">
        <p class = "footer-info"> Made with <i id = "heart-emoji"></i> in New York </p>

        <ul>
          <li>
            <a href = "https:sanminimal.com/portfolio" target = "_blank">Brewed for you by Seean Kim</a>
          </li>
          <li>
            <a href = "https://github.com/Skim-chee/coffeeapp" target = "_blank">Taste the code at Github</a>
          </li>
          <li>
            <a href = "https://twitter.com/home?status=For%20NY,%20the%20city%20never%20sleeps%20and%20neither%20should%20you%20(just%20kidding%20please%20sleep)%20https%3A//thecitythatneversleeps.me%20by%20%40Skim_chee" target = "_blank">Tweet a cup of joe
            </a>
          </li>
          <li>
            <a href = "https://www.facebook.com/sharer/sharer.php?u=https%3A//thecitythatneversleeps.me" target = "_blank">Spill the beans on Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>


export default {
  name: 'app',
  methods: {
    goHome: function(){
      this.$router.push('/');
    }
  }
}
</script>

<style lang = "scss">

@import "./src/assets/styles/vars.scss";

@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:900');


/* reset */

* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
       -webkit-margin-before:0em;
        -webkit-margin-after:0em;
}

html {
  overflow-x: hidden;
}

a {
  text-decoration: none;
}

a,
a:active,
a:focus {
  outline: none !important;
  /* Works in Firefox, Chrome, IE8 and above */
}
button,
button:active,
button:focus {
  outline: none !important;
  /* Works in Firefox, Chrome, IE8 and above */
}

img {
  &,
  &:active,
  &:hover {
    outline: none !important;
  }

  display: block;
}

button {
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 0;
}

html {
  font-family: 'Open Sans', sans-serif;
  color: $off-black;
}

body {
  margin: 0;
}

/* Typography */
h1{
  font-family: $serif;
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  line-height: 56px;
  margin-top: 16px;

  @include desktop {
    margin-top: 32px;
    font-size: 72px;
    line-height: 72px;
  }
}

p {
  font-size: 21px;
  font-weight: 600;
}

.white {
  color: #fff;
}

.primary {
  color: $primary;
  /*border-bottom: 1px solid $primary;*/
}
.secondary{
  color: $secondary;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @include flexbox();
  flex-direction: column;
  margin-top: 24px;
  width: 100%;

  @include desktop {
    margin-top: 48px;
  }


  #logo {
    height: 148px;
    align-self: center;
    cursor: pointer;
    @include desktop {
      margin-bottom: 32px;
    }
  }
}

.body {
  align-self: center;
  min-width: 312px;
  max-width: 800px;
  @include flexbox();
  flex-direction: column;
  align-items: center;
}

/*Button styling*/

/*Styles general buttons*/
.btn-primary {
  height: 48px;
  width: 192px;
  margin-top: 48px;
  margin-bottom: 24px;
  cursor: pointer;

  @include desktop {
    height: 64px;
    margin-top: 64px;
    margin-bottom: 32px;
  }

  background: $white;
  border-radius: 2px;
  border: 2px solid $primary;
  text-align: center;
  align-self: center;

  transform: translateY(0px);
  transition: all .3s ease;

  p {
    color: $primary;
    font-size: 17px;
  }

  &:active, &:hover {
    background: $primary;
    transform: translateY(-3px);
    transition: all .3s ease;
    border-color: transparent;
    box-shadow: 0 2px 2px $gray;

    p {
      color: $white;
    }
  }
}

.btn-secondary {
  @extend .btn-primary;

  border: 2px solid $secondary;
  p {
    color: $secondary;
  }

  &:active, &:hover {
    background: $secondary;
  }
}
footer {
  /*width: 300px;*/
}
.footer-container {
  margin-top: 72px;
  height: 320px;
  background-color: $primary;
  @include flexbox();
  flex-direction: column;

  ul {
    padding: 0;
    align-self: center;
    list-style: none;
    li {
      margin: 8px 0;
      transform: translateY(0px);
      transition: all .3s ease;
      &:hover {
        transform: translateY(-3px);
        transition: all .3s ease;
      }
    }
    a {
      font-size: 17px;
      color: $white;

      &:hover {
        text-shadow: 0px 1px 1px #444444;
      }
    }
  }
}
.footer-info {
  align-self: center;
  margin-top: 64px;
  margin-bottom: 32px;
}
#heart-emoji {
  width:24px;
  height: 24px;
  margin-right: 6px;
  padding: 0 24px 0 0;
  background: url('./assets/facebook-love.svg') center no-repeat;
}
</style>
