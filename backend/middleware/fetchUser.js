import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const fetchUser = (req,res,next)=>{
//Get the user from the jwt token and add it to req object
const token = req.header("auth-token");
if(!token){
    res.status(401).send({error:"please authenticate with valid token"})
}
try {
  const data = jwt.verify(token,process.env.JWT_SECRET)
  req.user=data.user;
    next();  
} catch (error) {
     res.status(401).send({error:"please authenticate with valid token"})
}

}
export default fetchUser;