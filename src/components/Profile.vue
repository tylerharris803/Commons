<template>

<div class="container">
  <h1>Welcome to {{this.profile.name}}'s Profile</h1>
  <div class="row">
    <div class="col-sm-6" style="background-color:lightgreen;">
      <div class="header" >Profile Info</div>
      <img src="/images/icon2.png" style="width: 50%" class="profilepic">
      <div class="container" >
        <p> Username: @{{this.profile.username}} </p>
        <p> Email: {{this.profile.email}} </p>
        <p> City: {{this.profile.city}} </p>
  <div class="edit">
  <div class="upload" v-if="findProfile">
    <input v-model="findProfile.name">
    <p></p>
    <input v-model="findProfile.email">
    <p></p>
    <input v-model="findProfile.city">
    <div class="actions" v-if="findProfile">
      <button @click="editProfile(findProfile)">Edit</button>
    </div>
    <p></p>
  </div>
</div>

    </div>
    </div>

    <div class="col-sm-6" style="background-color:lightblue;">

      <div v-if= "loggedIn()">
      <div class = "header">Timeline</div>
      <p>Add to {{this.profile.name}}'s timeline!</p>
      <form class="timeline" v-on:submit.prevent="addComment">
        <input v-model="addedName" placeholder="Name">
        <textarea v-model="addedComment" placeholder="Comment"></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h3>Comments</h3>
      <div v-for="comment in comments" v-bind:key="comment._id">
        <hr>
        <p>{{comment.comment}}</p>
        <p><i>--{{comment.name}}</i></p>
      </div>
      <!-- <div class="container" v-for="user in friends" :key="user.id">
      <div class="table">
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.address.city}} </td>
      </div>
        <button class="auto" v-on:click= "deleteFriend(user)">Unfollow</button>
      </div> -->
      </div>
      <div class="doit" v-else><h1>Log-in or Register to be able to post a comment on this {{this.profile.name}}'s page!</h1></div>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
    return{
      findProfile: null,
      profile: {},
      loading: true,
      addedName: '',
      addedComment: '',
      comments: [],
    }
  },
  computed: {
    friends() {
      return this.$root.$data.friends;
    },
    posts() {
      return this.$root.$data.getPosts();
    },
    currentProfile() {
      return this.$root.$data.currentProfile;
    },
  },
  async created() {
  this.getProfile();
  //this.findUser = this.$root.$data.currentUser;
  this.profile = (await axios.get("/api/profiles/" + this.$route.params.id)).data;
  //axios.get("/api/followers/" + this.findUser._id);
},
  methods: {
    loggedIn () {
    if (this.$root.$data.user != null) {
      return true
    }
  },
    addComment() {
      this.comments.push({
        name: this.addedName,
        comment: this.addedComment,
      })
 },
    async getProfile() {
  try {
    let response = await axios.get("/api/profiles");
    this.profiles = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
    async editProfile(profile) {
     try {
       await axios.put("/api/profiles/" + profile._id, {
         name: this.findProfile.name,
         email: this.findProfile.email,
         city: this.findProfile.address.city,
       });
       this.findProfile = null;
       this.getProfile();
       return true;
     } catch (error) {
       console.log(error);
     }
   },

    // deleteFriend(user) {
    //   let findUser = this.$root.$data.friends.indexOf(user);
    //   this.$root.$data.friends.splice(findUser, 1);
    // },

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
.edit {
  display: flex;
}
.timeline {
  display: flex;
  justify-content: center;
}
.doit {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
