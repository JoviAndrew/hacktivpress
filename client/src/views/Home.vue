<template>
  <div class="home">
    <div class="row">
      <div class="mainBody mt-5 col-12 mx-0">
        <h1>Welcome to HacktivPress!</h1>
        <div class="buttonLogin">
          <button class="btn btn-outline-primary" @click="gotoLogin">Login</button>
        </div>
        <div class="buttonRegister">
          <button class="btn btn-outline-danger" @click="goToRegister">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    gotoLogin() {
      this.$router.push('/login')
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.mainBody{
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 2px solid burlywood;
  border-radius: 25px;
  padding: 2%
}
</style>
