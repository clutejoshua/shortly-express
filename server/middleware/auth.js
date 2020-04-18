const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let cookies = req.cookies;
  //get cookies of the request
  if (!cookies) {
    //console.log('before get request for cookies', cookies);
    models.Sessions.get(cookies).then((data) => {
      console.log("inside get return");
      //if there are cookies on the user request do this
      if (data) {
        req.session = data;
        res.cookies(cookies);
      } else {
        //otherwise, create cookies for the user session
        models.Sessions.create()
          .then((data) => {
            let seshId = data.id; //get the id of the created session then assign to cook
            return models.Sessions.get({ seshId }); //gets the data from the get fn to pass
            //thru
          })
          .then((data) => {
            //then sets the request equal to the data we created
            req.session = data;
            //responds with new cookie of the requested session
            res.cookie("id", req.session);
            next();
          });
      }
    });
  } else {
    console.log("in else statement");
    req.session = {};
    let session = req.session;
    res.send(session);
    next();
    //   models.Sessions.create()
    //     .then((data)=>{
    //       let seshId = data.id //get the id of the created session then assign to cook
    //       return models.Sessions.get({seshId});//gets the data from the get fn to pass
    //       //thru
    //     }).then((data) => {
    //       //then sets the request equal to the data we created
    //       req.session = data;
    //       //responds with new cookie of the requested session
    //       res.cookie('id', req.session);
    //       next();
    // });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

