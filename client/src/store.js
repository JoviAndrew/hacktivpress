import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import swal from 'sweetalert'
import axios from 'axios'

export default new Vuex.Store({
  state: {
    posts: [],
    postCategory: [],
    isLogin: false
  },
  mutations: {
    renewCategoryPosts (state, postData){
      state.postCategory = postData
    },
    renewPosts (state, postData) {       
      state.posts = postData
    },
    changeStatusTrue (state) {
      state.isLogin = true
    },
    changeStatusFalse (state) {
      state.isLogin = false
    }
  },
  actions: {
    getAllPosts({commit}){
			let self = this
			axios.get('http://localhost:3000/home/show')
			.then(function(postData){
			  commit('renewPosts', postData.data.data)
			})
			.catch(function(err){
				swal('Error while getting posts', err, 'warning')
				console.log(err)
			})
    },
    getPostByCategory({commit}, category){
      axios.get('http://localhost:3000/home/show-category', {category: category})
			.then(function(postData){
			  commit('renewCategoryPosts', postData.data.data)
			})
			.catch(function(err){
				swal('Error while getting posts', err, 'warning')
				console.log(err)
			})
    }
  }
})
