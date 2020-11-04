
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
        const complaintId = req.params.complaintId
        Complaint.findById(complaintId).then((category) => {
            
            Complaint.updateOne({ _id: complaintId }, req.body).then(() => {
                res.status(200).json({
                    message: `Update Complaint - ${complaintId}`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'complaint not found'
            })
        });
       
    },
    deleteComplaint: (req, res) => {
        const complaintId = req.params.complaintId
        console.log(complaintId,"complaintId")
        Complaint.findById(complaintId).then(() => {
            
            Complaint.deleteOne({ _id: complaintId }).then(() => {
                res.status(200).json({
                    message: `Article _id:${complaintId} Deleted`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'complaint not found'
            })
        });
        
    }
}
 

    