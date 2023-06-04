var express = require('express');
var router = express.Router();
const multer  = require('multer')
var register = require('../models/register')
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// adddata 


router.post('/adddata' , upload.single('file') , async function(req, res, next) {
  console.log(req.file.originalname);
  var obj = {
    name:req.body.name,
    image:req.file.originalname 
  }
  // console.log(obj);
  data = await register.create(obj)
  res.redirect('/show')

});
router.get('/show',async function(req, res, next) {
  data = await register.find()
  // console.log(data);
  res.render('show', { data });
});


router.get('/edit/:id' , async function(req , res , next){
      console.log(req.params.id);

      try{
          data = await register.findById(req.params.id)
          // console.log(data);
          res.render('edit' , {
              data  
          })
      }
      catch{
            console.log('error');
      }
   
})
router.post('/editdata/:id' ,upload.single('file') , async function(req , res , next){
  //  console.log(req.params.id);
  //  console.log(req.body.name);
  //  console.log(req.file);

   try{ 
          if(req.file == undefined)
          {
            var data = await register.findById(req.params.id)
            console.log(data.image);
              var obj = {
                name : req.body.name,
                image : data.image
              }
              try
              {
                 insert = await register.findByIdAndUpdate(req.params.id , obj)
                res.redirect('/show')
              }
              catch{
                  console.log('image undefined error');
              }
             
          }
          else
          {
            var obj = {
              name : req.body.name,
              image : req.file.originalname
             }
             try{
              data = await register.findByIdAndUpdate(req.params.id , obj)
              res.redirect('/show')
             }
             catch{
                  console.log('error else');
             }
             
          }
   }
   catch{
        console.log('something wrong');
   }

})

// delete data

router.get('/delete/:id',async function(req, res, next) {

  // console.log(req.params.id);
  var id = req.params.id
    try{
          data = await register.findById(id)
          console.log(data.image);
          fs.unlink('public/images/'+data.image, (err)=>{
          console.log('file deleted');})
          var alldata = await register.findByIdAndDelete(id)
         res.redirect('/show')
    }
    catch{
      console.log('error');
    }
});





module.exports = router;
