const CustomAPIError = require('./custom');

const notFound = (req, res, next) => res.status(404).json({msg:`We couldn't currently provide the resource you requested`});

const errorHandling = (err,req,res,next) => {
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({msg:err.message});
  }
  console.log(err);
  return res.status(500).json({msg:`Something went wrong please try again later`});
}

module.exports = {notFound, errorHandling};