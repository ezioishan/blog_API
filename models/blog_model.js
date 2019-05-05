const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    contributor: String,
    description: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Blogs', BlogSchema);