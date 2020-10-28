
const mongoose = require('mongoose');
const Complaint = require('../models/complaint');

module.exports = {
    getAllComplaint: (req, res) => {
        Complaint.find().then((complaints)=>{
            res.status(200).json({
                complaints
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
    },
    createComplaint: (req, res) => {
    
            const {user,complaint}=req.body;
            
            const objComplaint=new Complaint({
                _id: new mongoose.Types.ObjectId(),
                user,
                complaint,
            });
            console.log(objComplaint,'objComplaint')
            objComplaint.save().then(()=>{
                res.status(200).json({
                    message: 'Create a new complaint'
                })
            }).catch((err)=>{
                res.status(200).json({
                    err
                })
            })
    },
    updateComplaint: (req, res) => {
        // const complaintId = req.params.complaintId
       
        // Complaint.update({_id:complaintId},req.body).then(()=>{
        //     res.status(200).json({
        //         message: `Update Message - ${complaintId}`
        //     })
        // }).catch((err)=>{
        //     res.status(200).json({
        //         err
        //     })
        // })
    },
    deleteComplaint: (req, res) => {
        const articleId = req.params.articleId
    
        res.status(200).json({
            message: `Delete Complaint - ${articleId}`
        })
    }
}
 

    