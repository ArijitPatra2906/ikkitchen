const router = require("express").Router();

const Blog = require("../models/BlogModel");


//Create new blog
router.post("/", async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get total number
router.get("/count", async (req, res) => {
    try {
        const totalBlog = await Blog.countDocuments();

        res.status(200).json(totalBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update blog
router.put("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        try {
            const updatedPost = await Blog.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json("Updated blog!");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete blog
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        try {
            await blog.delete();
            res.status(200).json("Blog has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get blog
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.status(200).json(blogs)

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
