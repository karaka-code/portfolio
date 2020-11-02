const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("config");

const Chat = require("./models/Chat")

const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.use('/api/feedBack', require('./routes/feedBack.route'))
app.use('/api/auth', require('./routes/authentication.route'))
app.use('/api/chat', require('./routes/chat.route'))


io.on("connection", socket => {

    socket.on("Input Chat Message", msg => {
        connect.then(db => {
            try {
                let chat = new Chat({
                    message: msg.chatMsg,
                    sender: msg.userId,
                    time: new Date().toLocaleString("en-US", {
                        timeZone: "Europe/Kiev",
                    })
                })
                chat.save((err, doc) => {
                    if (err) return json({success: false, err})

                    Chat.find({"_id": doc._id})
                        .populate("sender")
                        .exec((err, doc) => {
                            return io.emit("Output Chat Message", doc)
                        })
                })
            } catch (e) {
                console.log(e)
            }
        })

    })

})


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder
    app.use(express.static("client/build"));

    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server Running at ${port}`)
});