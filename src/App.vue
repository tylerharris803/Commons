<template>
<div id="app">
  <div id="menu">
    <div id="brand">
      <router-link to="/">
      <img src="/images/commons.png">
      </router-link>
    </div>
    <div id="side">
      <router-link to="/">
        <img src="/images/Home_icon_black.png">
        <div class="menu-item">
          <p> Home</p>
        </div>
      </router-link>
    </div>
    <div id="side" class="user">
  <router-link to="/dashboard">
  <img src="/images/menu-icon.png">
  <p class="menu-item"> You</p>
  </router-link>
    </div>
  </div>
  <router-view />
  <p></p>
  <p class='menu-item'>Github repository: </p>
  <p class= 'menu-item'> https://github.com/tylerharris803/Commons.git --- Click <a href='https://github.com/tylerharris803/Commons.git'>here</a></p>
  <p class='menu-item'> This project took: 14+ hours (CP4 and CP5)</p>
</div>
</template>

<script>

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 0px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;

}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}
.user{
  padding-right: 70px;
}
.browse {
  margin-right: 50px;
}
</style>
