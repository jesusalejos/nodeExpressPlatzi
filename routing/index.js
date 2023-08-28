const express = require ('express');
const products = require ('./products');
const users = require ('./users');
const categories = require ('./categories');

function routerApi(app) {

  const router = express.Router();

  app.use('/api/v1',router);

  router.use('/products', products);
  router.use('/users', users);
  router.use('/categories', categories);
}

module.exports = routerApi;
