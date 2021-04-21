import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  profiles: [],
  friends: [],
  user: null
}

//   getPosts() {
//     return this.friends;
//   },
//   addPosts(post, username) {
//     this.posts.push({
//       id: this.currentID,
//       post: post,
//       username: username
//     });
//     this.currentID += 1;
//   }
// }

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
