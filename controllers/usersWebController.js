const usersWebModel = require("../models/usersWebModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorMessage = require("../util/errorMessage");



module.exports = {
    
    create: async function (req, res, next) {
        try{
            const categories = await usersWebModel.find({});
            console.log(req.body,categories);
            const user = new usersWebModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            const document = await user.save();
            res.json(document);
        }catch(e){
            res.json({message:e.message})
        }
        
    },

    login: async (req, res, next) => {
        try{
            const userWeb = await usersWebModel.findOne({email:req.body.email})
            if(!userWeb){
                res.json({error:true,message:errorMessage.USERSWEB.mailIncorrecto})
                return
            }
            if(bcrypt.compareSync(req.body.password,userWeb.password)){
                const token = jwt.sign({userId:userWeb._id},req.app.get("secretKey"),{expiresIn:"1h"})
                res.json({error:false,message:"Login ok",token:token})
                return
            }else{
                res.json({error:true,message:errorMessage.USERSWEB.passwordIncorrecto})
                return
            }
        }catch(e){
            console.log("sale por aca");
            res.json({message:e.message})
        }

    }
}