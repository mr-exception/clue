var ObjectId = require('mongodb').ObjectID
var assert = require('assert')
var uniqueValidator = require('mongoose-unique-validator')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  players: [{type: Object}],
  /*
    { chat_id, is_my_turn, my_role }
  */
  status: {
    type: Number,
    enum: [
      1, // not started, waiting to start
      2, // all 4 players joined to game, waiting for round to start
      3, // 
    ]
  },
  rounds: [{
    word: {type: String, required: true}
  }]
  
}, { collection: 'games' })
schema.plugin(uniqueValidator,{ message: 'duplicated {PATH}' })

module.exports = {
  schema,
  title: 'game'
};