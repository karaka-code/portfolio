const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: false, unique: false},
    text: {type: String, required: true, unique: true},
    time: {type: String, required: true, unique: true}
})

module.exports = model('FeedBack', schema)