var ObjectId = require('mongodb').ObjectID
var assert = require('assert')
var uniqueValidator = require('mongoose-unique-validator')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  name: {type: String, required: true},
  chat_id: {type: String, required: true},
  username: {type: String, required: true},
  score: {type: Number, required: true, default: 0},
  coins: {type: Number, required: true, default: 1000},
  status: {
    type: Number,
    enum: [
      1, // active
      2, // deactive
    ],
    default: 1
  }
}, { collection: 'players' })
schema.plugin(uniqueValidator,{ message: 'duplicated {PATH}' })

module.exports = {
  schema,
  title: 'player'
};