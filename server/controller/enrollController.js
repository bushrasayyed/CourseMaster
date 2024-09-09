const Enroll = require('../models/Enroll');  // Adjust the path as necessary

// Create a new enrollment
// exports.createEnrollment = async (req, res) => {
//   try {
//     const { userId, courseId, progress, is_completed, completed_at } = req.body;

//     const newEnrollment = new Enroll({
//       userId,
//       courseId,
//       progress,
//       is_completed,
//       completed_at,
//     });

//     const savedEnrollment = await newEnrollment.save();
//     res.status(201).json(savedEnrollment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating enrollment', error });
//   }
// };
exports.createEnrollment = async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    // Check if enrollment already exists
    const existingEnrollment = await Enroll.findOne({ userId, courseId });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course.' });
    }

    // Create new enrollment
    const newEnrollment = new Enroll({ userId, courseId });
    await newEnrollment.save();

    res.status(201).json({ message: 'Enrollment successful!', enrollment: newEnrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: 'Duplicate enrollment detected.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};




// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enroll.find()
      .populate('userId', 'name')  // Populate user name
      .populate('courseId', 'title'); // Populate course title
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error });
  }
};


// Endpoint to get all enrollments for a specific user
exports.getEnrollmentById = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameter

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const enrollments = await Enroll.find({ userId: userId }).populate('courseId');

    if (!enrollments.length) {
      return res.status(404).json({ message: 'No enrollments found' });
    }

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error });
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
