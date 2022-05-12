const express = require("express");
const router = new express.Router();
const Category = require("../Models/Category");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "-"+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })
router.post("/category",upload.single('cat_img'),async(req,res)=>{
    try{
        // const user = new Category(req.body);
        const data = new Category({
            cat_id: req.body.cat_id,
            url: req.body.url,
            category_name: req.body.category_name,
            cat_type: req.body.cat_type,
            cat_img: req.file.filename,
            stockcheck: req.body.stockcheck,
            imagealt: req.body.imagealt,
            vedio: req.body.vedio,
            vedioalt: req.body.vedioalt,
            metatitle: req.body.metatitle,
            metakeyword: req.body.metakeyword,
            metadesc: req.body.metadesc,
            status: req.body.status,
            // image: req.files.image[0]['filename'],
            // gallery: req.files.gallery[0]['filename'],
        })
        const createCategory = await data.save();
        res.status(201).send(createCategory);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/category",async(req,res)=>{
    try{
        const categorysData = await Category.find();
        res.send(categorysData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/category/:id",async(req,res)=>{
    try{
        // const studentData = await Student.findById({_id:_id});
        // res.send(req.params.id);
        // console.log(req.params.id);
        const _id = req.params.id;
        const categorysData = await Category.findById(_id);
        if(!categorysData){
            return res.status(404).send();
        }
        else {
        res.send(categorysData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/category/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateCategory = await Category.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateCategory);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/category/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteCategory);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;