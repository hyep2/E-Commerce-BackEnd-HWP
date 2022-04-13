const router = require('express').Router()
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

//get all categories
router.get('/categories', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    let categories = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(categories)
  }
  catch (err) {
    res.status(500).json({err})
  }
})

//get category by id
router.get('/categories/:id', async ({params: {id}}, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let category = await Category.findOne({ where: {id}, include: [{model: Product}] });
    res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json({err})
  }
})

router.post('/categories', async({body}, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(body);
    res.status(200).json(newCategory);
  }
  catch (err){
    res.status(500).json({err})
  }
})

// router.put('/categories/:id', async ({params: {id}, body}, res) => {
//   // update a category by its `id` value
//   try {

//   }
//   catch (err) {
//     res.status(500).json({err})
//   }
// })

router.delete('/categories/:id', ({params: {id}}, res) => {
  // delete a category by its `id` value
  Category.destroy({where:{id}})
  .then (category) => {
    res.status(200).json(category)
  }
  .catch (err) {
    res.status(500).json({err})
  }
})

module.exports = router
