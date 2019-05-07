module.exports = (app) => {
    const Blogs = require('./controller.js');

    // Create a new blog
    app.post('/Blogs', Blogs.create);

    // Retrieve all blogs
    app.get('/Blogs', Blogs.findAll);

    // Retrieve a single blog with blogId
    app.get('/Blogs/:blogId', Blogs.findOne);

    // Update a Note with blogId
    app.put('/Blogs/:blogId', Blogs.update);

    // Delete a Note with blogId
    app.delete('/Blogs/:blogId', Blogs.delete);
}