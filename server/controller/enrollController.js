const Enroll = require('../models/Enroll');  // Adjust the path as necessary

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { userId, courseId, progress, is_completed, completed_at } = req.body;

    const newEnrollment = new Enroll({
      userId,
      courseId,
      progress,
      is_completed,
      completed_at,
    });

    const savedEnrollment = await newEnrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating enrollment', error });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enroll.find().populate('userId').populate('courseId');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error });
  }
};

// Get a single enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enroll.findById(id).populate('userId').populate('courseId');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollment', error });
  }
};

// Update an enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, is_completed, completed_at } = req.body;

    const updatedEnrollment = await Enroll.findByIdAndUpdate(
      id,
      { progress, is_completed, completed_at },
      { new: true, runValidators: true }
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating enrollment', error });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnrollment = await Enroll.findByIdAndDelete(id);

    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting enrollment', error });
  }
};
