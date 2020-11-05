const  express = require('express')
const router = express.Router();

const {
    login,
    sinup,
    updateUser,
    deleteUser
    }=require("../controllers/user")

router.post('/login', login)
router.post('/sinup', sinup)
router.patch('/:userId',updateUser )
router.delete('/:userId',deleteUser )

module.exports=router;