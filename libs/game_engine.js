var is_game_started = (game) => {
  return !(game.status == 1)
}

var round_count = (game) => {
  return (game.rounds.length)
}

var active_round = (game) => {
  if(round_count(game) > 0)
    return game.rounds[game.rounds.length-1]
}

var round_is_finished = (game, round) => {
  var round_word = round.word
  for(var i=0; i<round.logs.length; i++){
    var word = round.logs[i].word
    if(word == round_word)
      return true
  }
  return false
}