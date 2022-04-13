const router = require('express').Router()
const res = require('express/lib/response')
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

router.get('/tags/:id', async ({params: {id}}, res) => {
  // find tag by id
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findOne({ where:{id},include: [{model: Product}]})
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json({err})
  }
})

router.post('/tags', async ({ body }, res) => {
  //create new tag
  try {
    const newTag = await Tag.create(body);
    res.status(200).json(newTag);
  }
  catch (err) {
    res.status(500).json({ err })
  }
})


router.put('/tags/:id', async({params:{id}, body}, res) => {
  // update a tag's name by its `id` value
  try {
    let updateTag = await Tag.update(body, {where: {id}})
    res.status(200).json("Tag has been updated")
  } catch (error) {
    res.status(500).json({error})
  }
})

router.delete('/tags/:id', async({params:{id}}, res) => {
  // delete on tag by its `id` value
  try {
    let deleteTag = await Tag.destroy({where:{id}});
    res.status(200).json({message: 'Tag has been deleted'})
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
