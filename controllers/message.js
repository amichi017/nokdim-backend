const mongoose = require('mongoose');
const Message = require('../models/message');

module.exports = {
    getAllMessage: (req, res) => {
        Message.find().then((messages)=>{
            res.status(200).json({
                messages,
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
        
    },
    createMessage: (req, res) => {
        const {user,message}=req.body;
        const objMessage=new Message({
            _id: new mongoose.Types.ObjectId(),
            date:new Date(),
            user,
            message,
        });
        
        objMessage.save().then(()=>{
            res.status(200).json({
                message: 'Create a new Message'
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
        
    },
    updateMessage: (req, res) => {
        const messageId = req.params.messageId;
        console.log(messageId,"messageId");
        Message.update({_id:messageId},req.body).then(()=>{
            res.status(200).json({
                message: `Update Message - ${messageId}`
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
       
    },
    deleteMessage: (req, res) => {
        const messageId = req.params.messageId
         Message.remove({_id:messageId}).then(()=>{
            res.status(200).json({
                message: `Delete Mvvdvdvessage - ${messageId}`
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
       
    }
}
 

    