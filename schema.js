var requireDir = require('require-dir')

/*
  validator initializations
*/
var schemas = requireDir('./documents')

var models = {}
for(key in schemas)
  models[key] = 'NA'

var init = (database) => {
  for(key in schemas)
    models[key] = database.model(schemas[key].title, schemas[key].schema)
}
module.exports = {models, init};