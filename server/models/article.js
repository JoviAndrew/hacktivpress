const mongoose = require('mongoose');
const Schema = mongoose.Schema

let articleSchema = mongoose.Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'user'},
    username: String,
    header: String,
    post_text: String,
    img: String
}, {
    timestamps: true
})

let article = mongoose.model('article', articleSchema);

module.exports = article;