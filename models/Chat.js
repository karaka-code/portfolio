const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    message: {type: String},
    sender: {type: Types.ObjectId, ref: 'User'},
    time: {type: String, required: true, unique: true}
})

module.exports = model('Chat', schema)