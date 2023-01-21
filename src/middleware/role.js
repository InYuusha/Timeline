module.exports.role = async (request,response,next) => {
    try{
        
    }catch(error){
        return response.status(500).json({
            success:false,
            message:'Failed at role',
            error:error.message
        })
    }
};
