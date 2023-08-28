const {faker} = require ('@faker-js/faker');
const boom = require ('@hapi/boom');

class ProductsService {

  constructor () {
    this.products = [];
    this.generate();
  }

  generate (){

  const limit = 100;

  for (let i = 0; i < limit; i++) {

    this.products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.url(),
    });
  };

  }

  async find() {

    return new Promise ((res,rej) => {
      setTimeout(()=> {
        res(this.products);
      },2000);
    })
  }

  async findOne(id) {

 const productF = this.products.find(item => item.id === id);

if (!productF) {

  // throw new Error("This product not found...");

  throw boom.notFound("This product not found...");

  }
  return productF

  }

  async create(data){
    const newProduct = {
      id:faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct);
    return newProduct;
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id ===id);

    if (index === -1) {

      //throw new Error("product not found");

      throw boom.notFound("product not found");

    }

    const product = this.products[index];

//para que persistan las demás propiedades del object

    this.products[index] = {

      ...product,
      ...changes
    };

    return this.products[index];
  }

  async delete (id) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1){
      //throw new Error('Product not found')

      throw boom.notFound("product not found");
    }
    this.products.splice(index,1);
    return {message: `product ${id} deleted`}
  }

}

module.exports = ProductsService;
