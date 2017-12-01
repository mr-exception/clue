// their libraries
var fs = require('fs')
var mongoose = require('mongoose')
// my libraries
var {replace_all, parse_to_number} = require('./libs/string_functions.js')
const token = '473532174:AAFf1H5S4lW87W82r-kEOLdBTGyF2rkR0v4'
const telegram = require('./libs/telegram.js')
var schema = require('./schema.js')
var messages_list = require('./libs/messages.js')
var statera = require('./libs/stateras.js')

console.log('loading database schemas')

var database = mongoose.createConnection('mongodb://localhost:27017/clue')
schema.init(database)


telegram.set_token(token)
telegram.start()

/*
  first message every user sends
  there is registration and ack here
*/
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

/*
  just shows help message
*/
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

/*
  just shows users profile informations
*/
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

/*
  ## have to be designed
  shows the top ten players in bot
*/
telegram.on_text('/ranks', (args, name, username, chat_id, message) => {
  telegram.send_text_message(chat_id, 'rank data', {}, () => {})
})

telegram.on_callback('__create_game', (args, name, username, chat_id, message) => {
  schema.models.player.findOne({status: 1, chat_id}, (err, user_db) => {
    if(!err && user_db){
      statera.submit(chat_id, {state: 'BET'})
      telegram.send_text_message(chat_id, replace_all(messages_list.bet.fa, {
        coins: user_db.coins
      }), {}, () => {
        console.log(`game started by ${name}`)
      })
    }
  })
})

telegram.on_any_text((text, name, username, chat_id, message) => {
  schema.models.player.findOne({status: 1, chat_id}, (err, user_db) => {
    if(!err && user_db){
      var state = statera.get(chat_id)
      if(state.state == 'BET'){
        var bet = parse_to_number(text)
        if(bet == NaN){
          console.log('failed in bet')
        }else if(bet > user_db.coins){
          console.log('not enough money!')
        }else{
          console.log(`game with bet ${bet} by ${name}(${chat_id})`)
        }
      }else{
        console.log(`message from ${name} => ${text}`)
      }
    }
  })
  
})