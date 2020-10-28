const  express = require('express')
const router = express.Router();

const {
    getAllUser,
    createUser,
    updateUser,
    deleteUser
    }=require("../controllers/user")

router.get('/login', getAllUser)
router.post('/sinup', createUser)
router.patch('/:userId',updateUser )
router.delete('/:userId',deleteUser )

module.exports=router;