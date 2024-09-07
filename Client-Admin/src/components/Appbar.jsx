import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Person } from "@mui/icons-material"; // Import the Person icon
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Retrieve user email from local storage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("userEmail", null);
    setUserEmail(null); // Clear email from local state
    navigate("/");
    handleMenuClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        zIndex: 1,
        alignItems: "center",
        backgroundColor: "transparent", // Optional: Add a background color for better visibility
      }}
    >
      

      <div style={{ display: "flex", alignItems: "center" }}>
        {userEmail ? (
         
            <div style={{ position: "relative" }}>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  style={{
                    color: "purple",
                    backgroundColor: "whitesmoke",
                    width: "40px", // Increase size if needed
                    height: "40px", // Increase size if needed
                    border: "2px solid purple", // Optional: Add a border for better visibility
                  }}
                >
                  <Person
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "purple", // Color of the icon
                    }}
                    fontSize="small" // Adjust size if needed
                  />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
         
        ) : (
          <IconButton
            color="inherit"
            onClick={() => navigate("/login")} // Navigate to login if no email
          >
            <Person style={{ color: "white" }} /> {/* Add user icon */}
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Appbar;
