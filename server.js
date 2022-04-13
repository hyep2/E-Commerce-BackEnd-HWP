require("dotenv").config;

const express = require('express')
const { join } = require("path");

// import sequelize connection
const db = require("./config/connection");


const app = express()

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const{ Product, Category, Tag, ProductTag } = require("./models")

app.use(require('./routes'))

// sync sequelize models to the database, then turn on the server
async function init() {
  await db.sync();
  app.listen(process.env.PORT || 3000)
}
init();

