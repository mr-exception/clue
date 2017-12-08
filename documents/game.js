var ObjectId = require('mongodb').ObjectID
var assert = require('assert')
var uniqueValidator = require('mongoose-unique-validator')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  bet: {type: Number, required: true},
  players: [{
    _id: {type: String, required: true, index: true},
    name: {type: String, required: true},
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
  }],
  /*
    { chat_id, is_my_turn, my_role }
  */
  status: {
    type: Number,
    enum: [
      1, // not started, waiting to start
      2, // all 4 players joined to game, waiting for round to start
      3, // round started waiting for B help
      4, // waiting for B guess
      5, // waiting for A help
      6, // waiting for A guess
      7, // game canceled
    ],
    default: 1
  },
  team_a: [{
    _id: {type: String, required: true, index: true},
    name: {type: String, required: true},
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
  }],
  team_b: [{
    _id: {type: String, required: true, index: true},
    name: {type: String, required: true},
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
  }],

  rounds: [{
    word: {type: String, required: true},
    logs: [{
      action: {type: String, required: true, enum: ["HELP", "GUESS", "START"]},
      chat_id: {type: String, required: true},
      word: {type: String, required: true}
    }]
  }]
  
}, { collection: 'games' })
schema.plugin(uniqueValidator,{ message: 'duplicated {PATH}' })

module.exports = {
  schema,
  title: 'game'
};