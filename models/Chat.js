const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    message: {type: String},
    sender: {type: Types.ObjectId, ref: 'User'},
    type: {type: String}
}, {timestamps: true})

module.exports = model('Chat', schema)