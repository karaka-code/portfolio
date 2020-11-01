const { Router } = require("express");
const router = Router();
const Chat = require("../models/Chat");

// api/chat/
router.get("/", async (req, res) => {
    try {
        Chat.find()
            .populate("sender")
            .exec((err, chats) => {
                if(err) return res.status(400).send(err)
                res.status(200).send(chats)
            })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
