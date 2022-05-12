const express = require("express");
const router = new express.Router();
const Generic = require("../Models/Generic");
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
const cpUpload = upload.fields([{ name: 'cat_img', maxCount: 1 },{ name: 'banner', maxCount: 1 }])
router.post("/generic",cpUpload,async(req,res)=>{
    try{
        const data = new Generic({
            cat_id: req.body.cat_id,
            url: req.body.url,
            category_name: req.body.category_name,
            cat_type: req.body.cat_type,
            cat_img: req.files.image[0]['filename'],
            stockcheck: req.body.stockcheck,
            imagealt: req.body.imagealt,
            vedio: req.body.vedio,
            vedioalt: req.body.vedioalt,
            metatitle: req.body.metatitle,
            metakeyword: req.body.metakeyword,
            metadesc: req.body.metadesc,
            status: req.body.status,
        })
        const createGeneric = await data.save();
        res.status(201).send(createGeneric);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/generic",async(req,res)=>{
    try{
        const genericsData = await Generic.find();
        res.send(genericsData);
    }catch(e){
        res.send(e);
    }
})

// get the indivisual student data using id

router.get("/generic/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const genericsData = await Generic.findById(_id);
        if(!genericsData){
            return res.status(404).send();
        }
        else {
        res.send(genericsData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the students by it id

router.patch("/generic/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateGeneric = await Generic.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateGeneric);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the students by it id
router.delete("/generic/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteGeneric = await Generic.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteGeneric);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;