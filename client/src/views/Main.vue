<template>
  <div class="main">
    <div class="row">
      <div class="mainBody col-9">
          <div class="col-12">
              <div class="intro col-12">
                <label class="greeting">You have logged in as <strong>{{username}}</strong></label>
              </div>
              <div class="posts" v-for="(post, index) in posts" :key="index">
                    <div class="postHeader">
                      <h3>{{post.header}}</h3>
                    </div>
                    <div class="image">
                      <img src="" alt="">
                    </div>
                    <div class="postContent">
                        {{post.post_text}}
                    </div>
                    <div class="postBy">
                        Post by: <strong>{{post.username}}</strong> at: {{post.createdAt}}
                        <div class="udBtn" v-if="username == post.username">
                        <button class="btn btn-link" data-toggle="modal" data-target="#updateModal" v-on:click="setForUpdate(index)">Edit</button>
                        <button class="btn btn-link" v-on:click="deletePost(post._id)">Remove</button>
                        </div>
                    </div>
              </div>
          </div>
        </div>
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="Header" v-model="post_header">
                            <textarea placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" v-on:click="updatePost(post_id)" data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
          <div class="sideMenu col-3">
              <button class="addNewPost btn btn-outline-warning" data-toggle="modal" data-target="#addpostModal">Add New Article!</button>

                <div class="modal fade" id="addpostModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleheaderMainPostModalLabel">Add Post</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="text" placeholder="Header" v-model="post_header">
                                <textarea placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
                                <input type="text" placeholder="Category" v-model="category">
                                <label>Image:</label>
                                <input type="file" @change="onFilePicked" accept="image/*">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" v-on:click="addPost" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      username: localStorage.getItem('username'),
      formData: new FormData(),
      post_header: '',
      post_content: '',
      image_url: '',
      category: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('changeStatusTrue')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    addPost: function(){
      let name = this.itemname
      let header = this.header
      let postText = this.postText
      let self = this

      axios.post('http://localhost:3000/home/upload', this.formData)
      .then(function(response){
          let link = response.data.link
          axios.post('http://localhost:3000/home/post', 
          {
              name: name,
              price: prc,
              img: link
          })
          .then(function(response){
              alert(response.data.message);
              console.log(response)
              self.getAllProducts()
          })
      })
      .catch(function(err){
          console.log(err)
      })
    },
    onFilePicked (event) {
        let files = event.target.files
        console.log(files[0])
        this.createImage(files[0])
        this.formData.set('img', files[0])
    },
    createImage(file){
        var reader = new FileReader()
        reader.onload = (e) => {
            this.image_url = e.target.result;
        };
        reader.readAsDataURL(file) 
    },
  }
}
</script>

<style>

button.btn.btn-link{
    font-size: 11px
}
.addNewPost{
    margin: 2%
}
.modal-body{
    display: flex;
    flex-direction: column;
}
input{
    margin: 1%
}
textarea{
    margin: 1%;
    resize: none
}
h3{
    text-decoration: underline
}

.postBy{
    text-align: right;
    color: grey;
    margin: 2%;
    font-size: 12px
}
.intro{
    text-align: right;
    color: grey;
    margin:2%
}
.posts{
    border: 1px solid grey;
    border-radius: 10px

}
h2{
    text-align: left;
    margin-left: 2%;
    font-weight: bold
}
.mainBody {
    border: 1px solid rgb(250, 218, 159);
    border-radius: 25px
}
.sideMenu{
    border: 1px solid rgb(250, 218, 159);
    border-radius: 25px
}
</style>
