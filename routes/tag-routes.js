const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../models')

// The `/api/tags` endpoint

router.get('/tags', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tags = await Tag.findAll({include: [{model: Product}]})
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({err})
  }
})

router.get('/tags/:id', async({params:{id}}, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findOne({where: {id}, include: [{model: Product}]})
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/tags', (req, res) => {
  // create a new tag
})

router.put('/tags/:id', (req, res) => {
  // update a tag's name by its `id` value
})

router.delete('/tags/:id', (req, res) => {
  // delete on tag by its `id` value
})

module.exports = router
