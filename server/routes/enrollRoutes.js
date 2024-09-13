const express = require('express');
const router = express.Router();
const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
  } = require("../controller/enrollController");
router.post('/createEnrollment', createEnrollment);
router.get('/enrollments', getAllEnrollments);
router.get('/getEnrollments/:userId',getEnrollmentById);
router.put('/updateEnrollments/:id',updateEnrollment);
router.delete('/deleteEnrollments/:id',deleteEnrollment);

module.exports = router;
