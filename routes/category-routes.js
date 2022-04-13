const router = require('express').Router()
const { response } = require('express');
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

// create a new category
router.post('/categories', async({body}, res) => {
  try {
    const newCategory = await Category.create(body);
    res.status(200).json(newCategory);
  }
  catch (err){
    res.status(500).json({err})
  }
})

// update a category by its `id` value
router.put('/categories/:id', async ({params: {id}, body}, res) => {
  try {
    const updateCategory = await Category.update(body,{where:{id}})
    res.status(200).json({message: 'Category has been updated'})
  }
  catch (err) {
    res.status(500).json({err})
  }
})

// delete a category by its `id` value
router.delete('/categories/:id', ({params: {id}}, res) => {
  Category.destroy({where:{id}})
  .then ((category) => res.status(200).json({message: `Category has been deleted`}))
  // .catch ((err) => res.status(500).json({err}))
  .catch ((err) => res.status(500).json({err}))
  
})

module.exports = router
