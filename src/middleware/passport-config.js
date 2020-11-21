const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../db.js');
const passport = require('passport');

passport.use(
  new LocalStrategy((username, password, done) => {
  
    User.findOne({where:{ username: username }})
      .then(user=>{
        if(!user){
          return done(null, false)
        }
        bcrypt.compare(password, user.password).then(res=>{
          if(res){
            return done(null, user)
          }else{
            return done(null,false)
          }
        })
      })
  })
)

  passport.serializeUser((user, cb) => { 
    cb(null, user.id);
  });

  passport.deserializeUser( async (id, cb) => {    
    await User.findOne({where:{id:id}})
     .then(user=>{
       cb(null, user)
     })
     .catch(err=>{
       return  cb(err)
     })
  });

