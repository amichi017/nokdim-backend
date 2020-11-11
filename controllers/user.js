const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');



module.exports={
    getAllUser:(req, res) => {
         User.find().then((users)=>{
            res.status(200).json({
                users
            })
        })
    },
    login:(req, res) => {
       
        const {user,password}=req.body;
        
        User.find({ user }).then((users) => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            const [ userEx ] = users;
            
            bcrypt.compare(password, userEx.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {
                    // const token = jwt.sign({
                    //     id: userEx._id,
                    //     user: userEx.user,
                    // },
                    // process.env.JWT_KEY,
                    // {
                    //     expiresIn: "1H"
                    // });
                    
                    return res.status(200).json({
                        message: 'Auth successful',
                        
                    })
                }

                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
       
    
    },
    sinup:(req, res) => {
        const {user,password}=req.body;

        User.find({ user }).then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'user exists'
                })
            }

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    })
                }
    
                const objUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    user,
                    password: hash,
                    date:new Date(),
                })
    
                objUser.save().then((result) => {
                    console.log(result);
    
                    res.status(200).json({
                        message: 'User created'
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        })
    },
    updateUser:(req, res) => {
        const userId = req.params.userId
        const {user,password}=req.body;

        User.findById(userId).then(() => {
            

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    })
                }
               
                User.findById(userId).then(() => {
            
                    User.updateOne({ _id: userId }, { user,password: hash}).then(() => {
    
                    res.status(200).json({
                        message: 'User update'
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        })
        
    })
    },
    deleteUser:(req, res) => {
        const userId=req.params.userId;
        User.findById(userId).then(() => {
            User.deleteOne({ _id: userId }).then(() => {
                res.status(200).json({
                    message:`user delete ${userId}`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'userId not found'
            })
        });
        
    
    }
}
 

    