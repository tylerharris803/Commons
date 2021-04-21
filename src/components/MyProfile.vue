<template>
<div class="container">
  <div class="menu">
    <p><a><i class="container"></i></a></p>
    <h4>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="menu-item"> logout</i></a></h4>
  </div>

  <div class="row">
  <div class="container" style="background-color:lightblue;">
    <div class="header" >Welcome {{user.firstName}} {{user.lastName}}!</div>
    <img src="/images/icon2.png" style="width: 25%" class="profilepic">
    <p></p>
    <h3>You're following...</h3>
      <table class="table">
        <tbody>
          <tr v-for="profile in friends" v-bind:key="profile._id">
            <th scope="row">@{{profile.username}}</th>
            <td>{{profile.name}}</td>
            <td>{{profile.email}}</td>
            <td>{{profile.city}}</td>
          <button class="auto" v-on:click= "unfollowFriend(profile)">Unfollow</button>
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
  name: 'MyProfile',
  data() {
    return {
      username: "",
      name: "",
      email: "",
      city: "",
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
    this.getFriends();
  },

  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getFriends() {
  try {
    let response = await axios.get("/api/profiles/friends");
    this.$root.$data.friends = response.data;
    return true;
    } catch (error) {
      console.log(error);
    }
  },
  async unfollowFriend(profile) {
    try {
      await axios.delete("/api/profiles/friends/" + profile._id);
      this.getFriends();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
}
}
</script>

<style scoped>
.friends{
  justify-content: center;

}
.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>
