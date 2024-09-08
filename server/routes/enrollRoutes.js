const express = require('express');
const router = express.Router();
const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
  } = require("../controller/enrollController");
router.post('/enrollments', createEnrollment);
router.get('/enrollments', getAllEnrollments);
router.get('/enrollments/:id',getEnrollmentById);
router.put('/enrollments/:id',updateEnrollment);
router.delete('/enrollments/:id',deleteEnrollment);

module.exports = router;
