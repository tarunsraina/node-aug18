const express = require('express');

const router = express.Router();

// login

const credentials = {
    email : "admin@gmail.com",
    password : "admin123"
}

router.post('/login',(req,res)=>{
    const email = req.body.email;
    const pass = req.body.password;

    if(email == credentials.email && pass == credentials.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }else{
        res.end("Inavlid username :/ Try email as 'admin@gmail.com' and password as 'admin123'");
    
    }
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
    res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized user");
    }
})

//logout

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.render('base',{title:"Login",logout:"Logout success!"})
        }
    })
})


module.exports = router