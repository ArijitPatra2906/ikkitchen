const router = require("express").Router();
const Contact = require("../models/ContactModel")


router.post("/", async (req, res) => {
    try {
        newContactDetails = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        const course = await newContactDetails.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
})


// Get post
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Get total number
router.get("/count", async (req, res) => {
    try {
        const totalContacts = await Contact.countDocuments();

        res.status(200).json(totalContacts);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;