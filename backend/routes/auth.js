import express from "express"; 
const router = express.Router(); 
import User from "../models/User.js"; 
import { body, validationResult } from "express-validator"; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
import fetchUser from "../middleware/fetchUser.js" 
 
dotenv.config(); 
 
//ROUTE:1 - Create a user using : POST "/api/auth" 
router.post( 
  "/createuser", 
  [ 
    body("name", "Enter a valid name").isLength({ min: 5 }), 
    body("email", "Enter a valid email").isEmail(), 
    body("password", "password sholud be atleast 8 characters").isLength({ 
      min: 8 
    }), 
  ], 
  async (req, res) => { 
    let success = false; 
    //if there are errors,return bad request 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
      return res.status(400).json({success, errors: errors.array() }); 
    } 
    //Check whether the user with this email already exists 
    try { 
      let user = await User.findOne({ email: req.body.email }); 
      if (user) { 
        return res.status(400).json({success, error: "Sorry, user with this email already exists" }); 
      } 
      //password hashing 
      const salt = await bcrypt.genSalt(10); 
      const secPass = await bcrypt.hash(req.body.password,salt); 
    //Creating a new user 
      user = await User.create({ 
        name: req.body.name, 
        email: req.body.email, 
        password: secPass, 
      }); 
      const data = { 
        user:{ 
          id:user.id 
        } 
      } 
      const authToken = jwt.sign(data,process.env.JWT_SECRET); 
      success=true; 
      res.json({success, authToken}); 
       
    } catch (error) { 
      console.error(error.message); 
      res.status(500).send({success:false,error:"Internal server error"}); 
    } 
  }, 
); 

//ROUTE:2 - authenticate a user using : POST "/api/login" 
router.post( "/login",[ 
    
    body("email", "Enter a valid email").isEmail(), 
    body("password", "Password cannot be blank").exists(), 
  ], 
   async (req, res) => {  

    let success = false;  

    //if there are errors,return bad request 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
      return res.status(400).json({errors: errors.array() }); 
    } 
    const {email,password} = req.body; 
    
    try { 
       let user = await User.findOne({email}); 
       if(!user){ 
        success = false; 
        return res.status(400).json({success,error:"Please try to login with correct credentials"}); 
    } 
    const passwordCompare = await bcrypt.compare(password,user.password); 
    if(!passwordCompare){ 
      success = false; 
       return res.status(400).json({success,error:"Please try to login with correct credentials"}); 
    } 
     const data = { 
        user:{ 
          id:user.id 
        } 
      } 
      const authToken = jwt.sign(data,process.env.JWT_SECRET); 
      success=true; 
      res.json({success,authToken}); 
    } catch (error) { 
        success =false; 
       console.error(error.message); 
      res.status(500).send({success,error:"Internal server error"}); 
    } 
    
  } 
); 
 
//ROUTE:3 - Get Logged in user details using : POST "/api/getuser".Login required 
router.post("/getuser",fetchUser,async (req, res) => { 
  let success = false; 
    try { 
      const userId =  req.user.id; 
      const user = await User.findById(userId).select("-password"); 
      success = true; 
      res.json({success,user}) 
    } catch (error) { 
       success = false; 
       console.error(error.message); 
      res.status(500).send({success,error:"Internal server error"}); 
    } 
  } 
) 
 
export default router;