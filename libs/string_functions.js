var replace_all = (message, parameters) => {
  for(token in parameters)
    message = message.replace(`#${token}#`, parameters[token])
  return message
}

module.exports = {
  replace_all
}