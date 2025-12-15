const dotenv = require("dotenv");
dotenv.config();
const { UserRepository } = require("../repositories");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




async function register(data){
    const userRepository = new UserRepository();
    try{
        const user = await userRepository.findByEmail(data.email);
        if(user){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const newUser = await userRepository.create(data);
        return newUser;
    }catch(error){
        throw error;
    }
}

async function signin(data){
    const userRepository = new UserRepository();
    try{
        const user = await userRepository.findByEmail(data.email);
        if(!user){
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid password");
        }
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn : "1h"});
        return {user, token};
    }catch(error){
        throw error;
    }   
}

module.exports = {
    register,
    signin
}

