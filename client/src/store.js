import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    changeStatusTrue (state) {
      state.isLogin = true
    },
    changeStatusFalse (state) {
      state.isLogin = false
    }
  },
  actions: {
    getAllPosts(){
			let self = this
			axios.get('http://localhost/home/show')
			.then(function(postData){
				self.posts = postData.data.data                
			})
			.catch(function(err){
				alert('Error has occured during retrival of data')
				console.log(err)
			})
		},
  }
})
