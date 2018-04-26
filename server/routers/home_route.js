const router = require('express').Router();
const home = require('../controllers/home_controller');
const uploadFile = require('../middleware/upload');

router.get('/show', home.getAllPosts);

router.get('/show/:id', home.getOnePost);

router.get('/show/:authId', home.getByAuthor);

// router.get('/show-category', home.showByCategory)
router.post('/upload', 
            uploadFile.multer.single('img'),
            uploadFile.sendUploadToGCS,
            home.uploadImg)

router.post('/post',home.addPost);

router.put('/update/:id',
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            home.updatePost);

router.delete('/delete/:id', home.deletePost);

module.exports = router;