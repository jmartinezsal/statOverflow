const express = require('express');
const { route } = require('.');
const router = express.Router();
const {Question}  = require("../db/models")

app.set('view engine', 'pug');

router.post("/", async(req,res) => {
  const {header, content} = req.body
  const question = await Question.create({
    header,
    content
  })
  res.redirect("/")
})

route.get("/", async(req,res) => {
  const questions = await Question.findAll()
  res.render("qs_list", {questions})
})

route.get("/:questionId", async(req,res) => {
  const question = await Question.findByPk(req.params.id)
  
})
