let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  const multer = require('multer');

// Student Model
let languageSchema = require('..//Models/PhotoModel');
const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null, "../frontend/public/uploads/modelphoto");
  },
  filename:(req,file,cb) =>{
      cb(null, "firstlook-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage : fileStorageEngine});

// CREATE Student
router.route('/create-modelphoto').post(upload.single('image'),(req, res, next) => {
  var data = new languageSchema({
    language: req.body.language,
    category: req.body.category,
    modelname: req.body.modelname,
    url: req.body.url,
    image: 'uploads/modelphoto/'+req.file.filename,
})
    languageSchema.create(data, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Students
router.route('/').get((req, res, next) => {
    languageSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/language/:url').get((req, res, next) => {
  reviewSchema.find({language:req.params.url}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

router.route('/category/:url').get((req, res, next) => {
  reviewSchema.find({language:req.params.url,category:req.params.category}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

router.route('/getview/:url').get((req, res, next) => {
  reviewSchema.findOne({url:req.params.url}, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

// Get Single Student
router.route('/edit-modelphoto/:id').get((req, res, next) => {
    languageSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.route('/update-modelphoto/:id').put((req, res, next) => {
    languageSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Model Photo updated successfully !')
    }
  })
})

// Delete Student
router.route('/delete-modelphoto/:id').delete((req, res, next) => {
    languageSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;