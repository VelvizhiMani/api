const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://mongodb-drugcarts:YBebT9Kg6x7BZBC1@cluster-drugcarts.nuo2o.mongodb.net/drugcarts").then(()=>{
    console.log("connection is successfully")
}).catch(()=>{
    console.log("No connection");
})

// mongoose.connect("mongodb://localhost:27017/students-api",{
//         useCreateIndex:true,
//         userNewUrlParser:true,
//         useUnifiedTopology:true
//         useFindAndModify:false
    
// })
//mongodb://localhost:27017/drugcart