<!-- //TO DO -
4. Security Authentification. ()
6. Link followers to their respective users (ValidUser) -->

<template>
  <div class="container">
    <h2>Welcome to Commons! Add profiles to get started</h2>
    <p></p>

    <div class="add">
      <div class="form">
  <input v-model="username" placeholder="Username">
  <p></p>
  <input v-model="name" placeholder="Name">
  <p></p>
  <input v-model="email" placeholder="Email">
  <p></p>
  <input v-model="city" placeholder="City">
  <p></p>
  <button @click="upload">Add</button>

  <p></p>
  <h2>Click on any name to see their profile</h2>
  <p></p>
  </div>
</div>
<div class="row">
<div class="container" style="background-color:lightgreen;">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Profiles</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="profile in profiles" v-bind:key="profile._id">
          <router-link :to="{ name: 'Profile', params: {id:profile._id} }">
          <th scope="row">@{{profile.username}}</th>
          <td>{{profile.name}}</td>
          <td>{{profile.email}}</td>
          <td>{{profile.city}}</td>
          </router-link>
          <div v-if= "loggedIn()">
          <button class="auto" v-on:click= "addFriend(profile)">Follow</button>
          <button class="auto" v-on:click= "removeProfile(profile)">Delete</button>
        </div>
        </tr>
      </tbody>

    </table>
  </div>
</div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'Users',
    data(){
      return {
        username: "",
        name: "",
        email: "",
        city: "",
        addProfile: null,
      }
    },
    computed: {
      profiles () {
        return this.$root.$data.profiles;
      },
      user() {
        return this.$root.$data.user;
      },
      friends() {
        return this.$root.$data.friends;
      },
    },

    async created () {
      this.getProfiles();
      // this.getFriends();
    },

    methods: {
      loggedIn () {
      if (this.$root.$data.user != null) {
        return true
      }
    },
      async upload() {
      try {
        let r2 = await axios.post('/api/profiles', {
          username: this.username,
          name: this.name,
          email: this.email,
          city: this.city,
        });
        this.profiles.push(r2.data);
        this.$forceUpdate();
        this.username = "";
        this.name = "";
        this.email = "";
        this.city = "";
      } catch (error) {
        console.log(error);
      }
    },
    async addFriend(profile) {
    try {
      let r2 = await axios.post('/api/profiles/friends', {
        username: profile.username,
        name: profile.name,
        email: profile.email,
        city: profile.city,
      });
      this.friends.push(r2.data);
      this.$forceUpdate();
    } catch (error) {
      console.log(error);
    }
  },
    async getProfiles() {
  try {
    let response = await axios.get("/api/profiles");
    this.$root.$data.profiles = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
//   async getFriends() {
// try {
//   let response = await axios.get("/api/profiles/friends");
//   this.$root.$data.friends = response.data;
//   return true;
//   } catch (error) {
//     console.log(error);
//   }
// },
    async removeProfile(profile) {
  try {
    await axios.delete("/api/profiles/" + profile._id);
    this.getProfiles();
    return true;
  } catch (error) {
    console.log(error);
  }
},
    // async unfollowFriend(profile) {
    //   try {
    //     await axios.delete("/api/profiles/friends/" + profile._id);
    //     this.getFriends();
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
}
</script>

<style>
  h3 {
    margin-bottom: 5%;
  }
</style>

<style scoped>
.home {
  padding-top: 10px;
}
</style>
