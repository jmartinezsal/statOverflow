const express = require('express');
const { route } = require('.');
const router = express.Router();
const {Question}  = require("../db/models")


router.post("/", async(req,res) => {
  const {header, content} = req.body
  const question = await Question.create({
    header,
    content
  })
  res.redirect("/")
})

router.get("/", async(req,res) => {
  const questions = await Question.findAll()
  res.render("qs_list", {questions})
})

router.get("/:questionId", async(req,res) => {
  const question = await Question.findByPk(req.params.id)
  
})
