const articles = require('../models/article');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllPosts(req, res){
        articles.find({})
        .then(function(postData){
            res.status(200).json({
                message: 'success get articles',
                data: postData
            })
        })
        .catch(function(err){
          res.status(500).json({
            message: err
          })
        })
    },
    getOnePost(req, res){
      let id = req.params.id
      articles.findOne({
        _id: id
      })
      .then(function(postData){
        res.status(200).json({
          message: 'Success getting one post',
          article: postData
        })
      })
      .catch(function(err){
        res.status(500).json({
          message: err
        })
      })
    },
    showByCategory(req, res){
      articles.find({
        category: req.body.category
      })
      .then(function(postData){
        res.status(200).json({
          message: 'Success getting post',
          article: postData
        })
      })
      .catch(function(err){
        res.status(500).json({
          message: err
        })
      })
    },
    getByAuthor(req, res){
      const token = req.headers.token
      jwt.verify(token, process.env.SECRET, function(err, result){
        if(err){
          res.send({
            err: err,
            message: 'Something went wrong with jwt'
          })
        } else {
          articles.find({
            user: result.id
          })
          .then(function(postData){
            res.status(200).json({
              message: 'Success getting article by author',
              article: postData
            })
          })
          .catch(function(err){
            res.status(500).json({
              message: 'error while getting article by author',
              err: err
            })
          })
        }
      })
    },
    addPost(req, res){
      const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
					if(err){
						res.send({
							err: err,
							message: 'Something went wrong with jwt'
						})
					}
					else{
            console.log(req.body)
							articles.create({
								user: result.id,
								header: req.body.header,
								post_text: req.body.postText,
                username: result.username,
                img: req.body.img,
                category: req.body.category
							})
							.then(function(response){
								res.status(200).json({
									message: 'Success added new post!',
									response: response
								})
							})
					}
			})
		},
		updatePost(req, res){
			let id = req.params.id
			const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
				if(err){
					res.send({
						err: err,
						message: 'Something went wrong with jwt'
					})
				}else{
					articles.bulkWrite([{
						updateOne: {
							filter: {
								'_id': id,
								// user: result.id
							},
							update: {
								header: req.body.header,
                post_text: req.body.postText,
                img: req.body.img
							}
						}
					}])
					.then(function(response){
						res.status(200).json({
							message: 'Success update post',
							response: response
						})
					})
					.catch(function(err){
						res.status(500).json({
							message:'Error',
							err: err
						})
					})
				}
			})
		},
		deletePost(req, res){
			let id = req.params.id
			const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
				if(err){
					res.send({
						err: err,
						message: 'Something went wrong with jwt'
					})
				}else{
					articles.bulkWrite([{
						deleteOne: {
							filter: {
								'_id': id,
								// user: result.id
							}
						}
					}])
					.then(function(response){
						res.status(200).json({
							message: 'Successfully deleted a post!',
							response: response
						})
					})
					.catch(function(err){
						res.status(500).json({
							message: 'Error while deleting a post!',
							err: err
						})
					})
				}
			})
    },
    uploadImg(req, res){
      res.json({
          message: 'Successfully upload',
          link: req.file.cloudStoragePublicUrl
      })
    }
}