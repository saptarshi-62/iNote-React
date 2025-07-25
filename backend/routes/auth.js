const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET='mysecretkey';

//Route1: Creating a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Minimum password length is 5').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
],async (req, res) => {
    let success=false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try{
        let user= await User.findOne({ email: req.body.email });
        if(user){
            
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    //Create a new user
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken=jwt.sign(data, JWT_SECRET);
    //console.log(jwtData);
    success=true;
    res.json({success,authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
    
});


//Route2: Authenticating a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user=await User.findOne({ email });
        if(!user){
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
//Route3: Get logged in User details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req, res) => {
try{
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    //const user = await User.findById(req.user.id);
    success=true;
    res.json(success,user);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports = router;