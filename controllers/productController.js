import Product from '../models/product.js'
import {isAdmin} from './userController.js'

export async function createProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json(
            {
                message : "Only admin users can create products"
            }
        )
        return;
    }

    try {

        const existingProduct = await Product.findOne(
            {
                productId : req.body.productId
            }
        )
        if(existingProduct){
            return res.status(400).json(
                {
                    message : "Product with given productId already exists"
                }
            )
        }

        const data = {}

        data.productId = req.body.productId

        if(req.body.name == null){
            return res.status(400).json(
                {
                    message : "Product name is required"
                }
            )
        }

        data.name = req.body.name
        data.description = req.body.description || ""
        data.altName = req.body.altName || []

        if(req.body.price == null){
            return res.status(400).json(
                {
                    message : "Product price is required"
                }
            )
        }

        data.price = req.body.price
        data.labelPrice = req.body.labelPrice || req.body.price
        data.category = req.body.category || "Others"
        data.images = req.body.images || ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"]
        data.isVisible = req.body.isVisible ?? true
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        const newProduct = new Product(data)

        await newProduct.save()

        res.status(201).json(
            {
                message : "Product created successfully",
                product : newProduct
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                message : "Failed to create product",
                error : error
            }
        )
    }    
}

export async function updateProduct(req, res){
    if(!isAdmin(req)){
        res.status(401).json(
            {
                message : "Only admin users can update products"
            }
        )
        return;
    }
    try {
        const productId = req.params.productId

        const data = {}

        if(req.body.name == null){
            return res.status(400).json(
                {
                    message : "Product name is required"
                }
            )
        }

        data.name = req.body.name
        data.description = req.body.description || ""
        data.altName = req.body.altName || []

        if(req.body.price == null){
            return res.status(400).json(
                {
                    message : "Product price is required"
                }
            )
        }

        data.price = req.body.price
        data.labelPrice = req.body.labelPrice || req.body.price
        data.category = req.body.category || "Others"
        data.images = req.body.images || ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"]
        data.isVisible = req.body.isVisible
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        await Product.updateOne({productId: productId}, data)

        return res.status(201).json(
            {
                message : "Product updated successfully"
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                message : "Failed to update product",
                error : error
            }
        )
    }
}

export async function getProducts(req, res){
    try {
        if(isAdmin(req)){
            const products = await Product.find()
            res.status(200).json(
                {
                    products
                }
            )
        }else{
            const products = await Product.find({isVisible : true})
            res.status(200).json(
                {
                    products
                }
            )
        }        
    } catch (error) {
        res.status(500).json(
            {
                message : "Failed to fetch products",
                error : error
            }
        )
    }
}

export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.ststus(403).json(
            {
                message : "Only admin users can delete products"
            }
        )
        return;
    }
    try{
        const productId = req.params.productId
        await Product.deleteOne(
            {
                productId : productId
            }
        )
        res.status(201).json(
            {
                message : "Product deleted successfully"
            }
        )
    }catch(err){
        res.status(500).json(
            {
                message : "Failed to delete product",
                error : err
            }
        )
    }
}

export async function getProductById(req, res){
    try {
        
        const productId = req.params.productId
        const product = await Product.findOne({ productId: productId })

        if(product == null){
            return res.status(404).json(
                {
                    message : "Product not found"
                }
            )
        }

        if(!product.isVisible){
            if(isAdmin(req)){
                return res.status(200).json(
                    {
                        product
                    }
                )
            }else{
                return res.status(404).json(
                    {
                        message : "Product not found because it is not visible"
                    }
                )
            }
        }else{
            return res.status(200).json(
                {
                    product
                }
            )
        }
    } catch (error) {
        return res.status(500).json(
            {
                message : "Failed to fetch product",
                error : error
            }
        )
    }
}