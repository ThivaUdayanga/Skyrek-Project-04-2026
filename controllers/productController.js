export default function createProduct(req, res){

    //console.log(req.user)

    // console.log('product create successfully')
    res.status(201).json({
        message : "Product created successfully"
        }
    )
}