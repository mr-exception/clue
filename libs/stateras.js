var states = {}

var submit = (code, data) => {
    states[code] = data
}

var get = (code) => states[code]

module.exports = {submit, get}