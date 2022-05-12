const { application } = require("express");
const express = require("express")
app = express.Router();
const multer = require('multer')
const Upload = require("../Models/Upload");

//storage file
const Storage = multer.diskStorage({
    destination :"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')

app.get("/",(req,res) => {
    res.send("Upload file")
})

app.post("/upload",(req,res) =>{
    upload(req,res,(err) =>{
        if(err){
            console.log(err);
        }
        else{
            const newImage = new Upload({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },
                gallery:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send("Success")).catch((err)=> console.log(err));
        }
    })
})


module.exports = app;