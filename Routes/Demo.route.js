const express = require("express");
const router = new express.Router();
const Category = require("../Models/Subcategory");
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

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 },{ name: 'gallery', maxCount: 1 }])
router.post("/subcategory",cpUpload,async(req,res)=>{
    try{
        // console.log(req.files)
        // console.log(req.files.image[0]['filename'])
        // console.log(req.files.gallery[0]['filename'])
        const data = new Category({
            url: req.body.url,
            category: req.body.category,
            image: req.files.image[0]['filename'],
            gallery: req.files.gallery[0]['filename'],
        })
        const createUser = await data.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/subcategory",async(req,res)=>{
    try{
        const categorysData = await Category.find();
        res.send(categorysData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/subcategory/:id",async(req,res)=>{
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

router.patch("/subcategory/:id",async(req,res)=>{
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
router.delete("/subcategory/:id",async(req,res)=>{
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