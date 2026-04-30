import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function createUser(req, res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    const user = new User(
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashedPassword,
        }
    )

    user.save().then(
        () => {
            res.status(201).json({
                message : "User created successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message : "Failed to create user",
                error : error
            })
        }
    )

}

export function loginUser(req, res){
    // console.log(req.body.email)
    // console.log(req.body.password)

    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user) => {
            //console.log(user)

            if(user == null){
                res.status(401).json(
                    {
                        message : "User with given email does not exist"
                    }
                )
            }else{
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

                //console.log(isPasswordValid)
                if(isPasswordValid){

                    // Here you can generate a JWT token and send it back to the client for authentication in future requests
                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role: user.role,
                        image : user.image,
                        isEmailVerified : user.isEmailVerified
                    }, 'kv-computers-67')

                    res.status(200).json(
                        {
                            message : "Login successful",
                            token : token,
                            user : {
                                email : user.email,
                                role : user.role 
                            }
                        }
                    )
                }else{
                    res.status(401).json(
                        {
                            message : "Invalid password"
                        }
                    )
                }
            }
        }
    ).catch(
        (err) => {
            res.status(500).json(
                {
                    message : "Failed to login user Api endpoint error",
                    error : err
                }
            )  
        }
    )
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != 'admin'){
        return false;
    }else{
        return true;
    }
}