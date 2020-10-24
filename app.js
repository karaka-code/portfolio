const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

app.use('/static', express.static('static'))
app.use(express.json({extended: true}))

app.use('/api/feedBack', require('./routes/feedBack.route'))
app.use('/api/auth', require('./routes/authentication.route'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}



const PORT = config.get('port') || process.env.PORT

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()