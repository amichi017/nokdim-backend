const  express = require('express')
const router = express.Router();

const {
    getAllComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint
    }
    =require("../controllers/complaint")

router.get('/', getAllComplaint);
router.post('/', createComplaint);
router.patch('/:complaintId',updateComplaint );
router.delete('/:complaintId',deleteComplaint );

module.exports=router;