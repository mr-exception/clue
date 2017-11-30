/*
  if the game is started and all 4 players joined the game => true
*/
var is_game_started = (game) =>  !(game.status == 1)

/*
  returns the number rounds played and are playnig
*/
var round_count = (game) => (game.rounds.length)

/*
  get the active round (the last round) of game
*/
var active_round = (game) => {
  if(round_count(game) > 0)
    return game.rounds[game.rounds.length-1]
  return false
}

/*
  if the selected round is finished => last chat_id involved in game
*/
var round_is_finished = (game, round) => {
  var round_word = round.word
  for(var i=0; i<round.logs.length; i++){
    var word = round.logs[i].word
    if(word == round_word)
      return round.logs[i].chat_id
  }
  return false
}

/*
  if the round is finished => the winner team (charachter 'A' or 'B')
*/
var winner_team_of_round = (game, round) => {
  var winner_chat_id = round_is_finished(game, round)
  if(winner_chat_id){
    if(game.team_a.includes(winner_chat_id))
      return 'A'
    else
      return 'B'
  }else
    return null
}

/*
  validates the word (guess or help) to submit and broadcast that to other players
*/
var valid_word = (game, round, word) => {
  for(var i=0; i<round.logs.length; i++)
    if(word == round.logs[i].word && round.logs[i].action == 'HELP')
      return false
  return true
}
/*
  whos turn is now
*/
var whos_turn = (game) => {
  if(!is_game_started(game))
    return false

  var round_count = game.rounds.length
  if(round_count){

  }else
    return game.players[0]
}

var is_my_turn = (game, chat_id) => whos_turn(game).chat_id == chat_id

/*
  checks player can offer the bet on game
*/
var can_offer = (game, player) => (game.bet < player.coins)
/*
  join another player
*/
var join = (game, player) => {
  game.players.join(players)
  if(game.players.length == 4)
    game.status = 2
  return game
}
/*
  testing section
*/
var test_game = {
  bet: 200,
  players: [
    {
      name: 'reza',
      chat_id: 13242,
      username: '@reza_expr',
      score: 423,
      coins: 1200,
      status: 1
    },
    {
      name: 'reza',
      chat_id: 13242,
      username: '@reza_expr',
      score: 423,
      coins: 1200,
      status: 1
    },
    {
      name: 'reza',
      chat_id: 13242,
      username: '@reza_expr',
      score: 423,
      coins: 1200,
      status: 1
    },
    {
      name: 'reza',
      chat_id: 13242,
      username: '@reza_expr',
      score: 423,
      coins: 1200,
      status: 1
    }
  ],
  status: 2,
  team_a: [],
  team_b: [],
  rounds: []
}
console.log(is_my_turn(test_game, 13241))