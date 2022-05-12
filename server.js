const express = require("express");
require("./database/db");
const categoryRouter = require("./Routes/Category.route");
const subRouter = require("./Routes/Subcategory.route");
const genericRouter = require("./Routes/Generic.route");
const manufactuerRouter = require("./Routes/Manufactuer.route");
const formRouter = require("./Routes/Form.route");
const packageRouter = require("./Routes/Package.route");
const storageRouter = require("./Routes/Storage.route");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(categoryRouter);
app.use(subRouter);
app.use(genericRouter);
app.use(manufactuerRouter);
app.use(formRouter);
app.use(packageRouter);
app.use(storageRouter);

app.listen(port, ()=> {
    console.log(`Connection is setup at ${port}`)
})

