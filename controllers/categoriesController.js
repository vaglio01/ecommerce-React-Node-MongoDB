const categoriesModel = require("../models/categoriesModel")

module.exports = {

      getAll: async function(req, res, next) {
          try{
            const category = await categoriesModel.find({});
            res.json(category);
          }catch(e){
            next(e);
          }
          
      },


  create: async function(req, res, next) {
    
    try{
        const category = new categoriesModel({
          name: req.body.name
        })
        const cat = await category.save()
        res.json(cat);
        
    }catch(e){
        console.log(e)
      next(e);
    }
  },



}