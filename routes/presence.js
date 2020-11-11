const  express = require('express')
const router = express.Router();

const {
    getAllPresence,
    createPresence,
    updatePresence,
    deletePresence
    }
    =require("../controllers/presence")

router.get('/', getAllPresence);
router.post('/', createPresence);
router.patch('/:presenceId',updatePresence );
router.delete('/:presenceId',deletePresence );

module.exports=router;