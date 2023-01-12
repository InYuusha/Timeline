const jwt = require('jsonwebtoken')

module.exports.auth = async(request,response,next) => {
    try{
        const secret = process.env.SECRET;
        
        if(!request.headers.authorization)
            throw new Error('Token is required')
        
            const token = request.headers.authorization;

            const user = jwt.verify(token,secret)
            console.log("auth user ",user);
            request.user = user;
            next();
    }catch(error){
        console.log(error)
        throw new Error(error.message)

    }
}