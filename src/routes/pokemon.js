const express = require('express')
const Pokemon = require('../models/pokemon')
const router = new express.Router()

// Get all Pokemon
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page || 1 )
    const limit = Number(req.query.limit || 10)
    const sort = req.query.sort || 'id'
    const order = sort === 'id' ? 'ascending' : req.query.order || 'descending'
    const filter = req.query.filter || {}
    
    const pokemon = await Pokemon.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [sort]: order })

    const baseUrl = req.protocol + '://' + req.get('host') + req.path
    const count = await Pokemon.countDocuments()
    const totalPages = Math.ceil(count / limit)

    const getFullUrl = (baseUrl, page, limit, sort, order) => {
      return baseUrl + `?page=${page}` + `&limit=${limit}` + `&sort=${sort}` + `&order=${order}`
    }

    res.status(200).json({
      data: pokemon,
      meta: {
        count: pokemon.length,
        total: count,
        page: page,
        total_pages: totalPages,
        previous_page: page === 1 ? null : getFullUrl(baseUrl, page - 1, limit, sort, order),
        current_page: getFullUrl(baseUrl, page, limit, sort, order),
        next_page: page === totalPages ? null : getFullUrl(baseUrl, page + 1, limit, sort, order),
      }
    })
  } catch (err) {
    res.status(500).json({ error_code: 500, message: err })
  }
})

// Get Pokemon by their National Pokedex number
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id : req.params.id })

    if (!pokemon) {
      return res.status(404).json({ error_code: 404, message: 'No pokemon found.' })
    }

    res.json(pokemon)
  } catch (err) {
    res.status(500).json({ code: 500, message: err })
  }
})

module.exports = router
