const { User } = require('./db/models');

function loginUser(req, res, user){
  req.session.auth = {
    userId: user.id
  };
  req.session.save(function () {
    res.redirect("/");
  });
  console.log(req.session.auth)
};

async function restoreUser(req, res, next){

  if(req.session.auth){
    let { userId }= req.session.auth;

    try{
      let user = await User.findByPk(userId);

      if(user){
        res.locals.authenticated = true;
        res.locals.user = user;
        console.log(res.locals)
        next();
      }
    } catch(error){
      res.locals.authenticated = false;
      next(error);
    }
  }
  res.locals.authenticated = false;
  next();
}

function logoutUser(req,res){
  delete req.session.auth;
}

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/login');
  }
  return next();
}

module.exports = {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser
};
