const express = require ('express');
const ProductsService = require ('./../services/products.service');
const validatorHandler = require ('./../middleware/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require ('./../schema/product.shema');

const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {

  const products = await service.find();
  res.json(products);

})

router.get('/filter', (req,res)=> {
  res.send('I am a filter');
})


/// with middleware, for that we put next

router.get('/:id',
validatorHandler (getProductSchema, 'params'),
  async (req,res, next) => {

  try {

  const { id } = req.params;
  const product = await service.findOne(id);
  res.json(product);

  } //with middleware
  catch (e)  {
    next (e);
  }

  //catch (e) {
    //res.status(404).json({
  //    message: e.message
//    })
//  };


});

router.post('/',
  validatorHandler (createProductSchema, 'body'),
  async (req,res) => {

  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);

});

router.patch('/:id',
  validatorHandler (getProductSchema, 'params'),
  validatorHandler (updateProductSchema, 'body'),
  async (req,res,next)=> {

  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);

  } catch (e)  {
    next (e);

  }



});

router.delete('/:id',
validatorHandler (getProductSchema, 'params'),
  async (req,res,next)=> {

  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);

  } catch (e)  {
    next (e);
    }


});

module.exports = router;
