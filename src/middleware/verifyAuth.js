function verifyAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else {
        res.redirect('/login')
    }
}

function verifyAdmin(req,res,next){
    if(req.user.isAdmin){
        return next()
    }else {
        res.redirect('/perfil')
    }
}

module.exports = {verifyAdmin,verifyAuth};