import User from '../models/user.js'
import bcrypt from 'bcrypt'

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
                    res.status(200).json(
                        {
                            message : "Login successful"
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