<template>
  <div class="register">
    <div class="row">
      <div class="mainBody col-12 mt-5">
      <div class="col-4"></div>
      <div class="login col-4">
        <h4 class="headerLogin"><strong>Register</strong></h4>
        <label>First name:</label>
        <input type="text" placeholder="Tom" v-model="username">
        <label>Last name:</label>
        <input type="text" placeholder="Tommy" v-model="username">
        <label>Username:</label>
        <input type="text" placeholder="email@mail.com" v-model="username">
        <label>Password:</label>
        <input type="password" placeholder="6 characters alphanumeric"  v-model="password">
        <label>Confirm Password:</label>
        <input type="password" placeholder="Password" v-model="confirm">
        <div class="col-12">
            <button class="btn btn-primary" @click="doRegister">Register</button>
            <button class="btn btn-danger" @click="goToHome">Cancel</button>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'register',
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirm: '',
    }
  },
  methods: {
    doRegister () {
      let self = this
      console.log('masuk')
      axios.post('http://localhost:3000/index/register',
        {
          username: self.username,
          password: self.password,
          firstname: self.firstname,
          lastname: self.lastname
        })
        .then(function (response) {
          console.log(response.data.message)
          if (response.data.message !== 'success register a new user') {
            let message = response.data.message
            self.errorMessage = message
            self.hide = true
          } else {
            swal({title: 'Success', text: response.data.message, icon: 'success', buttons: 'OK'})
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    goToLogin () {
      this.$router.push('/login')
    },
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.headerLogin{
  margin: 3%;
  margin-bottom: 5%
}

.login{
  display: flex;
  flex-direction: column;
  border: 2px solid burlywood;
  border-radius: 25px;
  margin: 3%
}

.mainBody{
  display: flex;
  justify-content: center
}

.btn{
  margin: 2%
}
</style>
