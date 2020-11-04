const mongoose = require('mongoose');
const User = require('../models/user');

module.exports={
    getAllUser:(req, res) => {
        res.status(200).json({
            message:"user"
        })
    
    },
    createUser:(req, res) => {
        const {user,password}=req.body;
            
        const objUser=new User({
            _id: new mongoose.Types.ObjectId(),
            user,
            password,
        });
        console.log(objUser,'objUser')
        objUser.save().then(()=>{
            res.status(200).json({
                message: 'Create a new User'
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
    },
    updateUser:(req, res) => {
        const userId=req.params.userId;
        res.status(200).json({
            message:`user patch ${userId}`
        })
    
    },
    deleteUser:(req, res) => {
        const userId=req.params.userId;
        res.status(200).json({
            message:`user delete ${userId}`
        })
    
    }


}
 

    