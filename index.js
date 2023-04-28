require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 7000;
const mongourl= process.env.MONGO ;
const contactModel = require('./models/contactModel')
const quickenquiryModel = require('./models/quickenquiryModel')
app.listen(port, () => {
    console.log('Server is running at :'+ port);
  });
  app.set('view engine', 'ejs');
  app.set('views','./views')
  app.use(express.static('public'))

  
 app.get("/" ,function(req,res)
 {
     res.render('index')
 })
 app.get("/contact", function(req,res)
 {
     res.render('contact')
 })
 app.get("/about", function(req,res)
 {
     res.render('about')
 })
 app.get('/privacy', function(req,res)
 {
     res.render('privacy')
 })
 app.get('tandc', function(req,res)
 {
     res.render('tandc')
 })
app.post('/contact', async function(req,res)
{
  const singleusercontact=new contactModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      queryusr:req.body.query,
      message:req.body.message
    });
    try
    {
        const singlecontact = await singleusercontact.save();
        res.send(singlecontact);
    }
    catch(error)
    {
      console.log(error.message)
    }
})
app.post('/about', async function(req,res)
{
  const singleenquiry=new quickenquiryModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      message:req.body.message
    });
    try
    {
        const singleenqmodel = await singleenquiry.save();
        res.send(singleenqmodel);
    }
    catch(error)
    {
      console.log(error.message)
    }
})

 //Database Connection
 mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Database Connected"));

  // Using Assets and images
app.use('/assets',express.static('assets'));
app.use("/public/images",express.static('./public/images'));
