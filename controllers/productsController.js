const productsModel = require("../models/productsModel")
const categoryModel = require("../models/categoriesModel")

module.exports = {
  getAll: async function(req, res, next) {
    try{
      let queryFind={};
      if(req.query.buscar){
          queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}} 
      }
      const productos = await productsModel.find(queryFind).populate("category");
      res.json(productos);
    }catch(e){
      next(e);
    }
},

getDestacado: async function(req, res, next) {
  try{
    const productos = await productsModel.find({destacado: true});
    res.json(productos);
  }catch(e){
    next(e);
  }
},


    
    getById: async  function(req, res, next) {
      try{
        
        const producto = await productsModel.findById(req.params.id);
        res.json(producto);
        
     } catch(e){

         next (e);
     }
   },

   create: async function(req, res, next) {
  
    try{
      const categoria = await categoryModel.findBydIdAndValidate(req.body.category);
      if(categoria.error){
          res.json(categoria);
          return;
      }
      
      const producto = new productsModel({
        name:req.body.name,
        sku:req.body.sku,
        description:req.body.description,
        price:req.body.price,
        image: req.body.image,
        category:req.body.category,
        destacado:req.body.destacado
      })
      const prod = await producto.save()
      res.json(prod);
      console.log(prod);
    }catch(e){
      next(e);
    }
},

update: async function(req, res, next) {

  try {

      let producto = await productsModel.updateOne({ _id: req.params.id }, req.body, { multi: false })
      res.json(producto)

  } catch (e) {
      next(e)
  }
},


  delete: async function(req, res, next) {
    try{

        let producto = await productsModel.deleteOne({ _id: req.params.id })
        res.json(producto)

    } catch (e) {
        next(e)
    }
  }
}