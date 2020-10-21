const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: false},
    text: {type: String, required: true, unique: false}
})

module.exports = model('Contact', schema)