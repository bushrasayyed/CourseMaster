import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Skeleton } from "@mui/material"; // Import Skeleton
import "../index.css";
import axios from "axios";
import "./courseStyle.css";
import {  useNavigate } from "react-router-dom";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getAllCourses");
        console.log("API Response:", response);  // Log the entire response
          setCourses(response.data);
         
      } catch (error) {
        console.log("API Error:", error);  // Log any error
        setCourses([]); // Ensure courses is set to empty array on error
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched or an error occurs
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    // Handle enrollment logic here
    console.log("Enroll in course with ID:", courseId);
    navigate("/enroll", { state: { courseId } });
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
                    src={course.imageLink || "default-image.jpg"} // Use a default image if none provided
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
                  >
                    ENROLL
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
    </div>
  );
}

export default ShowCourses;
