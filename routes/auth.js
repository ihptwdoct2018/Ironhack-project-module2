const express = require('express')
const router = express.Router()
const User = require('../models/Usuario')

const bcrypt = require('bcrypt')
const bcryptSalt = 10


router.get('/signup', (req, res, next)=>{
  res.render("auth/signup")
})

router.post('/signup', (req, res, next)=>{
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  

  console.log(username)
  
  const salt = bcrypt.genSaltSync(bcryptSalt)
  const hashPass = bcrypt.hashSync(password, salt)

  if(username === "" || password === ""){
    res.render('auth/signup', {
      errorMessage: "Por favor introduce un usuario y una contraseña"
    });
    return
  }

  User.findOne({username: username})
  .then(user=>{
    if(user !== null){
      res.render('auth/signup', {
        errorMessage: "El usuario ya existe"
      });
      return
    }

    const newUser = User({
      email,
      username,
      password: hashPass
    })

    newUser.save()
    .then(user=>{
      res.redirect('/')
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>next(err))

})



// login


router.get('/login', (req, res, next)=>{
  res.render('auth/login')
})

router.post('/login', (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password

  if(username === "" || password === ""){
    res.render('auth/login', {
      errorMessage: 'Por favor introduce un nombre de usuario y contraseña'
    })
    return
  }

  User.findOne({"username": username})
  .then(user=>{
    if(!user){
      res.render('auth/login',{
        errorMessage: `El usuario ${username} no existe!!!`
      })
      return
    }
    if(bcrypt.compareSync(password, user.password)){
      req.session.currentUser = user
      res.redirect('/')
    }else{
      res.render('auth/login',{
        errorMessage: `La contraseña es que incorrecta`
      })
    }
  })
  .catch(err=>next(err))
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy((err)=>{
    res.redirect('/login')
  })
})
module.exports = router;