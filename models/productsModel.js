const mongoose = require ("../bin/mongodb")
const errorMessage = require("../util/errorMessage")




const productSchema = new mongoose.Schema ({
    id: Number,
    name: {
        type:String,
        require:[true, errorMessage.GENERAL.campo_obligatorio],
        minlength:[1,errorMessage.GENERAL.minlength]
    },
    sku: {
        type: String,
        require:[true, errorMessage.GENERAL.campo_obligatorio],
        unique:true
    },
    description: String,
    price: Number,
    image: String,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    destacado: {
        type: Boolean,
        default: false
    }
})

module.exports=  mongoose.model("products", productSchema)