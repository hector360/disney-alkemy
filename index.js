import express from "express";
// const compression = require('compression')
// const bodyParser = require('body-parser');
const app = express();
import sequelize from "./database/db.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3001;
app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
dotenv.config("./.env");
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  // sequelize.authenticate().then(()=>{
  sequelize.sync({force: false}).then(()=>{
      console.log('Nos hemos conectado a la base de datos')
  }).catch(error => {
      console.log(error);
  })
});