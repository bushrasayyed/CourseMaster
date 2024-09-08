import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Card } from "@mui/material";
import "./courseStyle.css";

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/api/enrollments", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setEnrolledCourses(res.data.enrollments); // Adjust based on actual response structure
        console.log("data.enrollments", res.data.enrollments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          flexGrow: 1,
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "600",
          color: "whitesmoke",
          textAlign: "center",
          marginTop: "70px",
        }}
      >
        Enrolled Courses
      </Typography>
      <div className="all-courses">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <>
            {enrolledCourses.length > 0
              ? enrolledCourses.map((enrollment) => (
                  <Card key={enrollment._id} style={{ margin: "10px", width: "300px", padding: "10px" }}>
                    <img
                      src={enrollment.course.imageLink || "default-image.jpg"} // Ensure imageLink is provided
                      alt={enrollment.course.title}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <Typography variant="h6" style={{ marginTop: "10px" }}>
                      {enrollment.course.title}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "5px" }}>
                      {enrollment.course.description}
                    </Typography>
                  </Card>
                ))
              : <h2 style={{ color: "white" }} >No courses enrolled yet!</h2>}
          </>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses;
