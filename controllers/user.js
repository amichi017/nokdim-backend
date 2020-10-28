

module.exports={
    getAllUser:(req, res) => {
        res.status(200).json({
            message:"user"
        })
    
    },
    createUser:(req, res) => {
        res.status(200).json({
            message:"user"
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
 

    