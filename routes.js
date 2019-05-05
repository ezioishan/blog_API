module.exports = (app) => {
    const blog = require('./controller.js');

    // Create a new blog
    app.post('/blog', blog.create);

    // Retrieve all blogs
    app.get('/blog', blog.findAll);

    // Retrieve a single blog with blogId
    app.get('/blog/:blogId', blog.findOne);

    // Update a Note with blogId
    app.put('/blog/:blogId', blog.update);

    // Delete a Note with blogId
    app.delete('/blog/:blogId', blog.delete);
}