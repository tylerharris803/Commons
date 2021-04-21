<template>
<div>
<Profile />
</div>
</template>

<script>
import Profile from '../components/Profile.vue'
import axios from 'axios';
export default {
  name: 'app',
  components: {
    Profile
  },
  data() {
  return {
   friends: [],
 }
},
 created() {
  this.getFriends();
},
methods: {
  async getFriends() {
    try {
      let response = await axios.get("/api/users");
      this.friends = response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
  },
}
}
</script>

<style>

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
