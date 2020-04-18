const sessions = require('../models/session');

const parseCookies = (req, res, next) => {
  //use request data for the username and cookie objects attached to user


  let cookieObj = {};

  if (req.headers.cookie) {
    let cookies = req.headers.cookie.split('; ');
    cookies.forEach((cookie) => {
      let cookieArr = cookie.split('=');
      cookieObj[cookieArr[0]] = cookieArr [1];
    });
    res.status(201);
  }

  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;

//calls req.cookies
