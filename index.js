const express = require('express');
//const https = require('https');
request = require('request');
const app = express();
var basicAuth = require('basic-auth');

 
const auth = function (req, res, next) {
 
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };
 
  var user = basicAuth(req);
 
  // Если пользователь не ввёл пароль или логин, снова показать форму.
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };
 
  // Если логин admin, а пароль superChargePassword перейти к
  // следующему middleware.
  if (user.name === 'admin' && user.pass === '1111') {
    return next();
  } else {
    return unauthorized(res);
  };
 
  return unauthorized(res);
};
app.get('/today', auth,  (req, res) => {
  request('https://www.cbr-xml-daily.ru/latest.js', (err, response, body)=>{
    if(err) return res.status(500).send({message: err})
    return res.send(body)
  });  
});


app.get('/thatday', auth, (req, res) => {
  console.log(req.query);
  request('https://cbr.ru/scripts/XML_daily.asp', req.query, (err, response, body)=>{
    if(err) return res.status(500).send({message: err})
    console.log(body).jsonEncode;
    return res.send(body)
  });
});


app.get('/thatday', auth, (req, res) => {
    res.send({ message: 'API не найден!' });
});




app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});
