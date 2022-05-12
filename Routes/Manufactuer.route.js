const express = require("express");
const router = new express.Router();
const Manufactuer = require("../Models/Manufactuer");
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
router.post("/manufactuer",upload.single('cat_img'),async(req,res)=>{
    try{
        // const user = new Category(req.body);
        const data = new Manufactuer({
            manufactuername: req.body.manufactuername,
            manufactuerurl: req.body.manufactuerurl,
            manufactueraddress: req.body.manufactueraddress,
            metatitle: req.body.metatitle,
            metakeyword: req.body.metakeyword,

            metadesc: req.body.metadesc,
            status: req.body.status,
            adddate: req.body.adddate,
            adduser: req.body.adduser,
            metakeyword: req.body.metakeyword,
            metadesc: req.body.metadesc,
            status: req.body.status,
            // image: req.files.image[0]['filename'],
            // gallery: req.files.gallery[0]['filename'],
        })
        const createManufactuer = await data.save();
        res.status(201).send(createManufactuer);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/manufactuer",async(req,res)=>{
    try{
        const manufactuersData = await Manufactuer.find();
        res.send(manufactuersData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/manufactuer/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const categorysData = await Manufactuer.findById(_id);
        if(!manufactuersData){
            return res.status(404).send();
        }
        else {
        res.send(manufactuersData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/manufactuer/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateManufactuer = await Manufactuer.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateManufactuer);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/manufactuer/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteManufactuer = await Manufactuer.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteManufactuer);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;