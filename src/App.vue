<template>
  <div id="app">
    <img id = "logo" src="./assets/logo@2x.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang = "scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:900');

/* Variables */

$sans-serif: 'Open Sans', sans-serif;
$serif: 'Playfair Display', serif;
$black: #000;
$white: #fff;
$off-black: #333;
$gray: #BBBBBB;
$primary: #119AF7;
$secondary: #FA1821;

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

/* Typography */
h1{
  font-family: $serif;
  font-size: 72px;
  font-weight: 900;
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

  display: flex;

  flex-direction: column;
  margin-top: 24px;

  #logo {
    height: 148px;
    align-self: center;
  }
}

.btn-primary {
  height: 48px;
  width: 192px;
  margin-top: 48px;

  background: $white;
  border-radius: 2px;
  border: 2px solid $primary;
  text-align: center;

  transform: translateY(0px);
  transition: all .3s ease;

  p {
    color: $primary;
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
</style>
