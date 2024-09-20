const express = require('express');
const router = express.Router();
const {
    addQuestion,getQuestionsByExamId
  } = require("../controller/questionController");
router.post('/addQuestion', addQuestion);

router.get('/getQuestionsByExam/:examId', getQuestionsByExamId);


module.exports = router;
