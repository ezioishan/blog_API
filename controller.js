const mongoose = require('mongoose');
require('./models/blog_model');
const blogs = mongoose.model('Blogs');
/* blogs->Db Schema
   Blog-> an object of blogs
*/

//Create new Blog
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Blog content can not be empty"
        });
    }

    // Create a Blog
    const Blog = new blogs({
        title: req.body.title || "No Blog title", 
        contributor: req.body.contributor,
        description: req.body.description
    });

    // Save Blog in the database
    Blog.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the Blog."
        });
    });
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
    blogs.find()
    .then(Blogs => {
        res.send(Blogs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving Blogs."
        });
    });
};

// Find a single product with a blogId
exports.findOne = (req, res) => {
    blogs.findById(req.params.blogId)
    .then(Blog => {
        if(!Blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });            
        }
        res.send(Blog);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving Blog with id " + req.params.blogId
        });
    });
};

// Update a blog
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Blog content can not be empty"
        });
    }

    // Find and update Blog with the request body
    blogs.findByIdAndUpdate(req.params.blogId, {
        title: req.body.title || "No blog title", 
        contributor: req.body.contributor,
        description: req.body.description
    }, {new: true})
    .then(Blog => {
        if(!Blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });
        }
        res.send(Blog);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.blogId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    blogs.findByIdAndRemove(req.params.blogId)
    .then(Blog => {
        if(!Blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });
        }
        res.send({message: "Blog deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Blog with id " + req.params.blogId
        });
    });
};