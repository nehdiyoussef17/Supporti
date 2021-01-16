const express = require('express');
const bodyParser = require('body-parser');
var crypto = require('crypto');
// create express app
const app = express();
var dbConn = require('./config/db.config');
var nodemailer = require('nodemailer');
var fs = require('fs');


// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

//mailing

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smailing396@gmail.com',
    pass: 'supporti123'
  }


});









// PASSWORD ULTIL
var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') /* Convert to hexa format */
      .slice(0, length); /* Return required number of characters */
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt); // User SHA512
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
};

function saltHashPassword(userPassword) {
  var salt = genRandomString(16); // GenRandomString with 16 characters to salt
  var passwordData = sha512(userPassword, salt);
  return passwordData;
}

function checkHashPassword(userPassword, salt) {
  var passwordData = sha512(userPassword, salt);
  return passwordData;
}




///diplay images
app.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  
  });
app.post("/user/affected_equipe",(req,res)=>{
  dbConn.query("UPDATE user SET equipe_favorite=? WHERE id_user = ?", [req.body.id_equipe, req.body.id_user],function(err,result){
    if(err) throw err;
    return res.json({message : 1});
  });
});



app.post('/register/', (req, res, next) => {
  var post_data = req.body; // Get POST params

  var plaint_password = post_data.password_user; // Get Password from POST params
  var hash_data = saltHashPassword(plaint_password);
  var password_user = hash_data.passwordHash; // Get hash value
  var salt = hash_data.salt; // Get salt
  var nom_user = post_data.nom_user;
  var email_user = post_data.email_user;
  var prenom_user = post_data.prenom_user;
  var equipe_favorite = post_data.equipe_favorite;
  var tel_user = post_data.tel_user;
  dbConn.query('SELECT * FROM user where email_user=?', [email_user], function (err, result, fields) {
    dbConn.on('error', function (err) {
      console.log('[MySQL ERROR]');
    });
    if (result && result.length)
      res.json('User already exists!!!');
    else {
      dbConn.query("INSERT INTO user (`nom_user`, `prenom_user`, `email_user`, `password_user`,`equipe_favorite`, `tel_user` ,`salt`) VALUES(?, ?, ?, ?, ?, ?,?)",
          [ nom_user, prenom_user, email_user, password_user, 0, tel_user, salt], function(err, result, fields) {
            dbConn.on('error', function (err) {
              console.log('[MySQL ERROR]', err);
              res.json('Register Error: ', err);

            });
            var mailOptions = {
              from: 'smailing396@gmail.com',
              to: email_user,
              subject: 'Bienvenu a supporti',
              text: `Bienvenu a supporti.tn`
            };
            
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else 


              {

                console.log('Email sent: ' + info.response);
              }
            });
            res.json('Register Successful!');
            transporter.close();
          })
    }
  });

})









app.post('/login/', (req, res, next) => {
  var post_data = req.body;

  // Extract email and password from request
  var user_password = post_data.password_user;
  var email = post_data.email_user;
  dbConn.query('SELECT * FROM user where email_user=?', [email], function (err, result, fields) {
    dbConn.on('error', function (err) {
      console.log('[MySQL ERROR]');
    });
    if (result && result.length) {
      var salt = result[0].salt; // Get salt of result if account exists
      var password_user = result[0].password_user;
      //Hash password from Login request with salt in Database
      var hashed_password = checkHashPassword(user_password, salt).passwordHash;
      if (password_user == hashed_password)
      	res.end(JSON.stringify(result[0]))
       // res.end(JSON.stringify('welcome')) // If password is true, return all info of User
      else
        res.end(JSON.stringify('Wrong Password'));
    }
    else {
      res.json('User Not Found!!!');
    }

  });

})


// Require user routes
const userRoutes = require('./src/routes/user.routes')
const eqRoutes = require('./src/routes/equipe.routes')
const accessoireRoutes = require('./src/routes/accessoire.routes')
const billetRoutes = require('./src/routes/billet.routes')
const matchRoutes = require('./src/routes/match.routes')
const storeRoutes = require('./src/routes/store.routes')

const actualiteRoutes = require('./src/routes/actualite.routes')

// using as middleware
app.use('/user', userRoutes)
app.use('/accessoire', accessoireRoutes)
app.use('/billet', billetRoutes)
app.use('/match', matchRoutes)
app.use('/store', storeRoutes)
app.use('/equipe', eqRoutes)
app.use('/actualite', actualiteRoutes)



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});