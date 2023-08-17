const express = require('express')
require('./db/mongoose')
const pokemonRoutes = require('./routes/pokemon')

const app = express()

app.use(express.json())
app.use(pokemonRoutes)

module.exports = app
