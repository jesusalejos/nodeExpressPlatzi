const boom = require ('@hapi/boom');

//JS clousure for create a dynamic middleware

function validatorHandler (schema, property) {
  return (req,res,next) => {
    const data = req[property]
    //req.body
    //req.params
    //req.query
    //por las razones mencionadas ponemos la variable property

    const { error } = schema.validate(data, {abortEarly:false});

    //{abortEarly:false} para que joy énvié todos los errores de una vez, y no uno por uno

    if (error) {

      next(boom.badRequest(error));

    }

    next();
  }


}

module.exports = validatorHandler;
