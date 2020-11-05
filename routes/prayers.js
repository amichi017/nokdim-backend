const  express = require('express')
const router = express.Router();

const {
    getAllPrayers,
    createPrayers,
    updatePrayers,
    deletePrayers
    }
    =require("../controllers/prayers")

router.get('/', getAllPrayers);
router.post('/', createPrayers);
router.patch('/:prayersId',updatePrayers );
router.delete('/:prayersId',deletePrayers );

module.exports=router;