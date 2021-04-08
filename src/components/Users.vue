<template>
  <div class="container">
    <h3>Find Commons users like you!</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">City</th>
          <th scope="col">Follow</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <th scope="row">@{{user.username}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address.city}}</td>
          <button class="auto" v-on:click= "addFriend(user)">Follow</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'Users',
    data(){
      return {
        users: [],

      }
    },

    methods: {
  addFriend(user) {
      this.$root.$data.friends.push(user);
    },
  },

    created: function() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          this.users = res.data;
        })
    }
  }

</script>

<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
