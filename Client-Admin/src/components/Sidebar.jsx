import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem button onClick={() => navigate("/courses")}>
          <ListItemText primary="Course Section" />
        </ListItem>
        <ListItem button onClick={() => navigate("/exams")}>
          <ListItemText primary="Exam Section" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
