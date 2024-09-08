import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add,Visibility  } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddLecture, setOpenAddLecture] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [lectureData, setLectureData] = useState({ title: '', videoUrl: '', order: '' });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAllCourses",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      image: null
    });
    setOpenEdit(true);
  };

  const handleAddLectureClick = (course) => {
    setEditingCourse(course);
    setLectureData({ title: '', videoUrl: '', order: '' });
    setOpenAddLecture(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseAddLecture = () => setOpenAddLecture(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleLectureChange = (e) => {
    const { name, value } = e.target;
    setLectureData({
      ...lectureData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    if (formData.image) {
      form.append('courseImage', formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/updateCourse/${editingCourse._id}`, form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh course data
      const response = await axios.get("http://localhost:5000/api/getAllCourses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCourses(response.data);
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleAddLectureSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/createLectures", {
        course_id: editingCourse._id,
        title: lectureData.title,
        videoUrl: lectureData.videoUrl,
        order: lectureData.order
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      });

      // Show success alert
      alert('Lecture added successfully!');

      // Optionally refresh course data if needed
      handleCloseAddLecture();
    } catch (error) {
      console.error("Error adding lecture:", error);
      // Show error alert
      alert('Failed to add lecture. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteCourse/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Typography
        variant="h4"
        style={{
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "whitesmoke",
          textAlign: "center",
          marginTop: "70px",
          fontSize: "25px",
        }}
      >
        All Courses
      </Typography>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((course) => (
          <Course
            key={course._id}
            course={course}
            onDelete={handleDelete}
            onEdit={() => handleEditClick(course)}
            onAddLecture={() => handleAddLectureClick(course)}
          />
        ))}
      </div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="edit-course-modal"
        aria-describedby="edit-course-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Edit Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openAddLecture}
        onClose={handleCloseAddLecture}
        aria-labelledby="add-lecture-modal"
        aria-describedby="add-lecture-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Add Lecture
          </Typography>
          <form onSubmit={handleAddLectureSubmit}>
            <TextField
              label="Title"
              name="title"
              value={lectureData.title}
              onChange={handleLectureChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Video URL"
              name="videoUrl"
              value={lectureData.videoUrl}
              onChange={handleLectureChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order"
              name="order"
              value={lectureData.order}
              onChange={handleLectureChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Add Lecture
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function Course({ course, onEdit, onDelete, onAddLecture }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/course-details/${course._id}`);
  };

  return (
    <div style={{ margin: "10px" }}>
      <Card
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div>
          <CardMedia
            sx={{
              height: 120,
              width: 80,
              minWidth: "100%",
              borderRadius: "20px",
            }}
            image={`http://localhost:5000/uploads/${course.imageLink}`}
            title={course.title}
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: isMouseOver && "#601b99",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": 2,
                "-webkit-box-orient": "vertical",
              }}
            >
              {course.title}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              style={{
                fontWeight: "50",
                fontSize: "12px",
                fontFamily: "inherit",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: isMouseOver && "#601b99",
              }}
            >
              {course.description}
            </Typography>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={onEdit}
                startIcon={<Edit />}
                size="small"
                style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={onAddLecture}
                size="small"
                style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
                startIcon={<Add />}
              >
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleView}
                size="small"
                style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
                startIcon={<Visibility  />}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(course._id)}
                size="small"
                style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
                startIcon={<Delete />}
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
