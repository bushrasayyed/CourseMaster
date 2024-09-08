import { useState } from "react";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import axios from "axios";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store image file
  const [price, setPrice] = useState(0);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the image file from input
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("courseImage", image); // Append image file to the form data

    try {
      await axios.post("http://localhost:5000/api/addcourse", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Set the proper content type for file upload
        },
      });

      alert("Added course!");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: 50,
        paddingTop: 50,
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card
          className="cardstyle"
          variant="outlined"
          sx={{ minWidth: 300, height: 330 }}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            label="Price"
            variant="outlined"
          />
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <br />
          <button
            className="button-nav"
            style={{ display: "flex", justifyContent: "center", marginLeft: "33%", width: "120px" }}
            onClick={handleSubmit}
          >
            Add Course
          </button>
        </Card>
      </div>
    </div>
  );
}

export default Addcourse;
