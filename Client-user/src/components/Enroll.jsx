import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

function Enroll() {
  const { courseId } = useParams(); // Get courseId from URL params
  const [message, setMessage] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course details based on courseId
    if (courseId) {
      axios
        .get(`http://localhost:5000/api/getCourse/${courseId}`)
        .then((response) => {
          // Set course details in state
          setCourseTitle(response.data.title);
          setCourseDescription(response.data.description);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          setMessage("An error occurred while fetching course details.");
        });
    }
  }, [courseId]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !courseId) {
      setMessage("Error: Missing student ID or course ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/createEnrollment/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Enrollment response data:', data); // Log the data to verify

      setMessage("Enrollment successful!");
      navigate("/enrolledCourses"); // Navigate only after successful enrollment
    } catch (error) {
      console.error("Error enrolling:", error);
      setMessage("An error occurred during enrollment.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Display course details */}
      <Typography variant="h4" style={{ marginBottom: "20px", color: "white" }}>
        {courseTitle || "Loading..."}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "20px", color: "white" }}>
        {courseDescription || "Course description will be available soon."}
      </Typography>

      {/* Enrollment Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Enroll in this Course
      </Button>

      {/* Message Display */}
      {message && (
        <Typography variant="body2" style={{ marginTop: "20px", color: "red" }}>
          {message}
        </Typography>
      )}
    </div>
  );
}

export default Enroll;
