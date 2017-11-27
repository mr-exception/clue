// their libraries
var fs = require('fs')
var mongoose = require('mongoose')
// my libraries
var {replace_all} = require('./libs/string_functions.js')
const token = '473532174:AAFf1H5S4lW87W82r-kEOLdBTGyF2rkR0v4'
const telegram = require('./libs/telegram.js')
var schema = require('./schema.js')
var messages_list = require('./libs/messages.js')

console.log('loading database schemas')

var database = mongoose.createConnection('mongodb://localhost:27017/clue')
schema.init(database)


telegram.set_token(token)
telegram.start()

telegram.on_text('/start', (args, name, username, chat_id, message) => {
  var player_model = new schema.models.player({name, username, chat_id})
  player_model.save((err, player_db) => {
    telegram.send_text_message(chat_id, replace_all(messages_list.hi.fa, {name}), {
        reply_markup:{
          inline_keyboard: [
            [{text: "یه بازی می خوام شروع کنم!", callback_data: "__create_game"}],
            [{text: "یه بازی رو می خوام شرکت کنم", callback_data: "__join_game"}],
          ]
        }
      }, () => {
        console.log(`${name} registerd`)    
      }
    )
  })
})

telegram.on_text('/help', (args, name, username, chat_id, message) => {
  telegram.send_text_message(chat_id, replace_all(messages_list.help.fa, {}), {
    reply_markup:{
      inline_keyboard: [
        [{text: "یه بازی می خوام شروع کنم!", callback_data: "__create_game"}],
        [{text: "یه بازی رو می خوام شرکت کنم", callback_data: "__join_game"}],
      ]
    }
  }, () => {})
})

telegram.on_text('/profile', (args, name, username, chat_id, message) => {
  schema.models.player.findOne({chat_id}, (err, player_db) => {
    if(err)
      console.log(`player ${chat_id} not found!!`)
    else
      telegram.send_text_message(chat_id, replace_all(messages_list.profile_info.fa, {
        name,
        score: player_db.score,
        coins: player_db.coins
      }), {}, () => {})
  })
  
})

telegram.on_text('/ranks', (args, name, username, chat_id, message) => {
  telegram.send_text_message(chat_id, 'rank data', {}, () => {})
})