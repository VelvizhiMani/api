const express = require("express");
const router = new express.Router();
const Form = require("../Models/Form");
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
router.post("/form",upload.single('cat_img'),async(req,res)=>{
    try{
        const data = new Form({
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
        const createForm = await data.save();
        res.status(201).send(createForm);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/form",async(req,res)=>{
    try{
        const formsData = await Form.find();
        res.send(formsData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/form/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const formsData = await Form.findById(_id);
        if(!formsData){
            return res.status(404).send();
        }
        else {
        res.send(formsData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/form/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateForm = await Form.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateForm);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/form/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteForm = await Form.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteForm);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;