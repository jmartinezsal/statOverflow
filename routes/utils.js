const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const checkPermissions = (answer, currentUser) => {
  if (answer.userId !== currentUser.id) {
    const err = new Error("Illegal Operation.");
    err.status = 403;
    throw err;
  }
};

const getRandomInt =(min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = {
  csrfProtection,
  checkPermissions,
  asyncHandler,
  getRandomInt
};
