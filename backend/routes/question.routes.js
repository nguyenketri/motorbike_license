const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");

// API GET Question
router.get("/", questionController.getAllQuestion);

// API POST
router.post("/", questionController.createQuestions);

module.exports = router;
