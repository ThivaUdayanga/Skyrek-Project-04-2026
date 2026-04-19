import jwt from 'jsonwebtoken'

export default function AutherizeUser(req, res, next){
        //console.log("Middleware executed")

        const header = req.header("Authorization")
        //console.log(header)

        if(header != null){
            const token = header.replace("Bearer ", "")
            //console.log(token)

            jwt.verify(token , 'kv-computers-67', 
                (err, decoded) => {
                    // console.log(decoded)
                    //req.user = decoded

                    if(decoded == null){
                        res.status(401).json(
                            {
                                message : "Invalid token"
                            }
                        )
                    }else{
                        req.user = decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }
}