const express = require ('express');
const {faker} = require ('@faker-js/faker')

const router = express.Router();

router.get('/',(req,res)=>{
  const {categoryId}= req.params
  res.json([
    {
      categoryId,
      category: 'Food',
      products: []
    },
    {
      categoryId,
      category: 'Games',
      products: []
    },
    {
      categoryId,
      category: 'clothes',
      products: []
    },
  ])
})

router.get('/:categoryId',(req,res)=>{
  const {categoryId}= req.params
  res.json([
    {
      categoryId,
      category: 'Undefined',
      products: []
    }
  ])
})

router.get('/:categoryId/products/:productId', (req,res) => {

  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
    name: 'unknow',

  });
})

module.exports = router;
