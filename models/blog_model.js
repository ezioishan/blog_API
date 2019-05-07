const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    contributor: String,
    description: String,
}, {
    timestamps: true
});

mongoose.model('Blogs', BlogSchema);