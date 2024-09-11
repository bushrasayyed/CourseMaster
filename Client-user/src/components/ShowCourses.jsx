import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Skeleton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./courseStyle.css";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set()); // Track enrolled courses
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getAllCourses");
        console.log("Courses Response", response.data);
        setCourses(response.data);
      } catch (error) {
        console.log("API Error:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem("id");
      if (!storedUserId) return;

      setUserId(storedUserId);

      // Fetch enrolled courses for the user
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/getEnrollments/${storedUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const enrolledCoursesSet = new Set(response.data.map(enroll => enroll.courseId._id));
        setEnrolledCourses(enrolledCoursesSet);
      } catch (error) {
        console.error("Error fetching enrolled courses", error);
      }
    };

    fetchCourses();
    fetchUserData();
  }, []);

  const handleEnroll = (courseId) => {
    setSelectedCourseId(courseId);
    setOpenDialog(true);
  };

  const handleConfirmEnrollment = async () => {
    const token = localStorage.getItem("token");
    console.log("User Id", userId);

    if (!userId || !selectedCourseId) {
      alert("Error: Missing student ID or course ID.");
      setOpenDialog(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/createEnrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, courseId: selectedCourseId }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the enrolledCourses state to disable the button for the enrolled course
        setEnrolledCourses(prev => new Set(prev).add(selectedCourseId));
        alert("Enrollment successful!");
        navigate("/enrolledCourses");
      } else {
        alert(data.message || "An error occurred during enrollment.");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("An error occurred during enrollment.");
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "whitesmoke",
          textAlign: "center",
          fontSize: "25px",
          marginBottom: "10px",
        }}
      >
        All Courses
      </Typography>
      <div className="all-courses">
        {isLoading ? (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
          </div>
        ) : (
          <>
            {courses.length > 0 ? (
              courses.map((course) => (
                <Card
                  key={course._id}
                  style={{ margin: "10px", width: "300px", padding: "10px" }}
                >
                  <img
                    src={course.imageLink || "default-image.jpg"}
                    alt={course.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <Typography variant="h6" style={{ marginTop: "10px" }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    {course.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                    onClick={() => handleEnroll(course._id)}
                    disabled={enrolledCourses.has(course._id)} // Disable if user is enrolled
                  >
                    {enrolledCourses.has(course._id) ? "Enrolled" : "ENROLL"}
                  </Button>
                </Card>
              ))
            ) : (
              <h2 style={{ color: "white" }}>
                "Oops! No course is currently offered. Return later!"
              </h2>
            )}
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to enroll in this course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEnrollment} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowCourses;
