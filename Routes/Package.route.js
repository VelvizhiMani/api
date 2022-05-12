const express = require("express");
const router = new express.Router();
const Package = require("../Models/Package");
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
router.post("/package",upload.single('cat_img'),async(req,res)=>{
    try{
        const data = new Package({
            packagename: req.body.packagename,
            packageurl: req.body.packageurl,
            status: req.body.status,
            adddate: req.body.adddate,
            timestamp: req.body.timestamp,
            updatedate: req.body.updatedate,
            uptimestamp: req.body.uptimestamp,
            adduser: req.body.adduser,
            updateuser: req.body.updateuser,
            updated_at: req.body.updated_at,
        })
        const createPackage = await data.save();
        res.status(201).send(createPackage);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/package",async(req,res)=>{
    try{
        const packagesData = await Package.find();
        res.send(packagesData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/package/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const packagesData = await Package.findById(_id);
        if(!packagesData){
            return res.status(404).send();
        }
        else {
        res.send(packagesData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/package/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updatePackage = await Package.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updatePackage);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/package/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deletePackage = await Package.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deletePackage);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;