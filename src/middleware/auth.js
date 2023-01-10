const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;

module.exports.auth = async(request,response,next) => {
    try{
        if(!request.headers.authorization)
            throw new Error('Token is required')
        
            const token = request.headers.authorization;

            const user = jwt.verify(token,secret)
            console.log(user);
            request.user = user;
            next();
    }catch(error){
        console.log(error)
        throw new Error(error.message)

    }
}