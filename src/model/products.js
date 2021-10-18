//schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name:{type:String, require=true},
    price:{type=Number, require=true},
    description:{type:String, require=true},
});

module.exports = mongoose.model('Products', ProductsSchema)