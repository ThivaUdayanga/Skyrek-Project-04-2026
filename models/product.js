import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        productId : {
            type : String,
            unique : true,
            required : true
        },
        productName : {
            type : String,
            required : true
        },
        productDescription : {
            type : String,
        },
        altName : {
            type : [String],
            default : []
        },
        productPrice : {
            type : Number,
            required : true
        },
        labelPrice : {
            type : Number
        },
        category : {
            type : String,
            default : 'Others'
        },
        images : {
            type : [String],
            default : ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"]
        },
        isVisible : {
            type : Boolean,
            default : true
        },
        brand : {
            type : String,
            default : 'Generic'
        },
        model : {
            type : String,
            default : 'Standard'
        }
    }
)

const Product = mongoose.model('product', productSchema)

export default Product