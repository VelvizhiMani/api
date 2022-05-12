const express = require("express");
const router = new express.Router();
const Storage = require("../Models/Storage");
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
router.post("/storage",upload.single('cat_img'),async(req,res)=>{
    try{
        const data = new Storage({
            formname: req.body.formname,
            formurl: req.body.formurl,
            picture: req.body.picture,
            alt: req.body.alt,
            metatitle: req.body.metatitle,
            metakeyword: req.body.metakeyword,
            metadesc: req.body.metadesc,
            status: req.body.status,
            adddate: req.body.adddate,
            timestamp: req.body.timestamp,
            updatedate: req.body.updatedate,
            uptimestamp: req.body.uptimestamp,
            adduser: req.body.adduser,
            updateuser: req.body.updateuser,
            updated_at: req.body.updated_at,
        })
        const createStorage = await data.save();
        res.status(201).send(createStorage);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/storage",async(req,res)=>{
    try{
        const storagesData = await Storage.find();
        res.send(storagesData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/storage/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const storagesData = await Storage.findById(_id);
        if(!storagesData){
            return res.status(404).send();
        }
        else {
        res.send(storagesData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/storage/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStorage = await Storage.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateStorage);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/storage/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteStorage = await Storage.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStorage);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;