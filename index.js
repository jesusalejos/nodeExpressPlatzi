const express = require ('express');
const routerApi = require ('./routing');
const {logErrors, errorHandler, boomErrorHandler} = require ('./middleware/errorHandler');

const app = express();
const port = 3000;


app.use(express.json()); //un middleware very important for the body post.

app.get('/', (req,res)=> {
  res.send("Hello world with express")
});

app.get('/new-route', (req,res)=> {
  res.send("This is a new route")
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=> {
  console.log(`Example app listening on  http://localhost:${port}/`);
});
