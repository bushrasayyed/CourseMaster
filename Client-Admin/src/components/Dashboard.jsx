import { Card, Typography, Grid, Box } from "@mui/material";
import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        style={{
          marginBottom: "20px",
          fontFamily: "Kaushan Script",
          color:"white"
        }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Courses Card */}
        <Grid item xs={12} sm={4}>
          <Card
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Typography variant="h6">Total Courses</Typography>
            <Typography variant="h4">10</Typography>
          </Card>
        </Grid>

        {/* Total Exams Card */}
        <Grid item xs={12} sm={4}>
          <Card
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Typography variant="h6">Total Exams</Typography>
            <Typography variant="h4">15</Typography>
          </Card>
        </Grid>

        {/* Total Students Card */}
        <Grid item xs={12} sm={4}>
          <Card
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h4">200</Typography>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" style={{ marginBottom: "20px" , color:"white"}}>
          Analytics Overview
        </Typography>

        {/* Static Graphs */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              width: "300px",
              height: "200px",
              backgroundColor: "#ddd",
              textAlign: "center",
              lineHeight: "200px",
            }}
          >
            Course Enrollments Graph
          </div>
          <div
            style={{
              width: "300px",
              height: "200px",
              backgroundColor: "#ddd",
              textAlign: "center",
              lineHeight: "200px",
            }}
          >
            Exam Performance Graph
          </div>
          <div
            style={{
              width: "300px",
              height: "200px",
              backgroundColor: "#ddd",
              textAlign: "center",
              lineHeight: "200px",
            }}
          >
            Student Growth Graph
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Dashboard;