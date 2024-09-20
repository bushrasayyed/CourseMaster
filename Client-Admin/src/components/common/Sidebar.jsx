import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
    variant="permanent"
    anchor="left"
    sx={{
      width: 240,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: 240,
        backgroundColor: "transparent", // Adjust the RGBA values as needed
        backdropFilter: "blur(10px)" // Optional: Adds a blur effect
      },
    }}
  >
      <Typography
        style={{ color: "white", fontFamily: "Kaushan Script", cursor: "pointer",marginTop:"20px",marginLeft:"40px"}}
        variant={"h4"}
        onClick={() => navigate("/")}
      >
        CourseMaster
      </Typography>
      <Divider />
      <List>
      <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemText 
            primary="Dashboard" 
            primaryTypographyProps={{ style: { color: 'white', fontFamily: "Kaushan Script",marginTop:"20px",marginLeft:"40px"} }} // Apply white color here
            
          />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/courses')}>
          <ListItemText 
            primary="Courses Section" 
            primaryTypographyProps={{ style: { color: 'white', fontFamily: "Kaushan Script",marginTop:"20px",marginLeft:"40px"} }} // Apply white color here
            
          />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/exams')}>
          <ListItemText 
            primary="Exam Section" 
            primaryTypographyProps={{ style: { color: 'white', fontFamily: "Kaushan Script",marginTop:"20px",marginLeft:"40px" } }} // Apply white color here
            
          />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/results')}>
          <ListItemText 
            primary="Results Section" 
            primaryTypographyProps={{ style: { color: 'white', fontFamily: "Kaushan Script",marginTop:"20px",marginLeft:"40px" } }} // Apply white color here
            
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
