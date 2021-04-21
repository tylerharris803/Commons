<template>
<Users />
</template>

<script>
import axios from 'axios';
import Users from '../components/Users.vue'
export default {
  name: 'app',
  components: {
    Users
  },
  data() {
   return {
     title: "",
     file: null,
     addFriend: null,
   }
 },
 methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async follow() {
     try {
       const formData = new FormData();
       formData.append(this.user, this.user.name)
       //let r1 = await axios.post('/api/photos', formData);
       let r2 = await axios.post('/api/users', {
         name: this.name,
         //path: r1.data.path
       });
       this.addFriend = r2.data;
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
