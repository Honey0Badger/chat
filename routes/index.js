var express = require('express');
var router = express.Router();
var Message = require('../lib/itemMes.js')
const { Pool } = require("pg");
const pool = new Pool({
    user: "web",
    host: "localhost",
    database: "test",
    password: "web",
    port: 5432
  });
  console.log("Подключаемся к базе данных");  

/* GET home page. */
router.get('/', function(req, res, next) {

});
/* GET home page. */
router.post('/login', function(req, res, next) {
  let login = req.body['login'];
  let userid = req.body['id'];
  let password = req.body['password'];
  let sql = `select id as countuser from chatusers where login = '${login}' and password = '${password}'`;
  console.log("login = " + login);
  console.log("password = " + password)
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    if(result.rows[0]==undefined){
      res.render('index', { title: 'Our messenger' });
    }
    userid = result.rows[0].countuser;
    console.log(userid); //id of user
  res.render('chat', { iduser: result.rows[0].countuser });
  sql = 'select login, message, time from message m join chatusers c on c.id = m."user" order by m."time" asc';

  let arrMessage = [];

  if (err) {
    return console.error(err.message);
  }
  if(result.rows[0]==undefined){
    for(let i = 0; i < result.rows.length; i++){
      let m = new Message();
      m.login = result.rows[i].login;
      m.message = result.rows[i].message;
      m.time = result.rows[i].time;
      arrMessage.push(m);
    }

    //res.render('chat', { title: 'Our messenger' });
  }})
  res.render('chat', { iduser: userid, mes: arrMessage});
});

router.post('/addmessage', function(req, res, next) {
  let message = req.body['message'];
  let iduser = req.body['id'];

  let sql = `insert into message ("time", message, "user") values (localtimestamp, '${message}', '${iduser}')`
  
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    /*if(result.rows[0]==undefined){
      res.render('chat', { title: 'Our messenger' });
    }})*/
})});

sql = 'select login, message, time from message m join chatusers c on c.id = m."user" order by m."time" asc';

pool.query(sql, [], (err, result) => {

  

  let arrMessage = [];

  if (err) {
    return console.error(err.message);
  }
  if(result.rows[0]==undefined){
    for(let i = 0; i < result.rows.length; i++){
      let m = new Message();
      m.login = result.rows[i].login;
      m.message = result.rows[i].message;
      m.time = result.rows[i].time;
      arrMessage.push(m);
    }

    //res.render('chat', { title: 'Our messenger' });
  }})
  res.render('chat', { iduser: userid, mes: arrMessage});


module.exports = router;