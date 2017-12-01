var replace_all = (message, parameters) => {
  for(token in parameters)
    message = message.replace(`#${token}#`, parameters[token])
  return message
}
var parse_to_number = (value) => {
  var newValue="";
  for (var i=0;i<value.length;i++){
    var ch=value.charCodeAt(i);
    if (ch>=1776 && ch<=1785){
      var newChar=ch-1728;
      newValue=newValue+String.fromCharCode(newChar);
    }else if(ch>=1632 && ch<=1641){
      var newChar=ch-1584;
      newValue=newValue+String.fromCharCode(newChar);
    }else
      newValue=newValue+String.fromCharCode(ch);
  }
  return newValue;
}

module.exports = {
  replace_all,
  parse_to_number
}