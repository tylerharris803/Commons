<template>

<div class="container">
  <h1>Your Profile</h1>
  <div class="row">
    <div class="col-sm-6" style="background-color:lightgreen;">
      <div class="header" >Profile Info</div>
      <div contenteditable="true">
      <p>@tymitchellharris</p>
    </div>
      <img src="/images/profilepic.jpeg" style="width: 50%" class="profilepic">
      <div class="container" style="background-color:white;">
      <div contenteditable="true">
      <p> Lindon, Utah </p>
      <p> 22 years old </p>
      <p> Studying Computer Science at BYU</p>
      </div>
    </div>
      <h3>Click on profile info to edit!</h3>
    </div>

    <div class="col-sm-6" style="background-color:lightblue;">

      <div class = "header">Following</div>

      <div class="container" v-for="user in friends" :key="user.id">
      <div class="table">
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.address.city}} </td>
      </div>
        <button class="auto" v-on:click= "deleteFriend(user)">Unfollow</button>
      </div>
<!--
      <tr v-for="user in friends" v-bind:key="user.id">
        <th scope="row">@{{user.username}}</th>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.address.city}}</td>
        <button class="auto" v-on:click= "addFriend(user)">Follow</button>
      </tr> -->

    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'profile',

  computed: {
    friends() {
      return this.$root.$data.friends;
    },
    posts() {
      return this.$root.$data.getPosts();
    }
  },
  methods: {
    deleteFriend(user) {
      let findUser = this.$root.$data.friends.indexOf(user);
      this.$root.$data.friends.splice(findUser, 1);
    },

    toggleForm() {
      this.posting = !this.posting;
    },
    addPosts() {
      this.$root.$data.addPosts(this.username, this.post);
      this.username = "";
      this.post = "";
      this.posting = false;
    },
  }
}

</script>

<style>
.header{
font-weight: bold;
font-size: 30px;
}
.profilepic{
margin: 10px;
}
.friends{

}

</style>
