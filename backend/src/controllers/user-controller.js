const {UserService} = require("../services");



async function register(req, res){
    try{
        const user = await UserService.register({
            email : req.body.email,
            password : req.body.password
        });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}


async function signin(req, res){
    try{
        const user = await UserService.signin({
            email : req.body.email,
            password : req.body.password
        });

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}


module.exports = {
    register,
    signin
}

