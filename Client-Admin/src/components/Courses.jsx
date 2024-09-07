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
import { Edit, Delete, Add, Visibility } from "@mui/icons-material";
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
  const [openAdd, setOpenAdd] = useState(false);
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

  const handleAddClick = async() => {
    try {
      setFormData({ title: '', description: '', image: null });
      setOpenAdd(true);
      await axios.post('http://localhost:5000/api/courses', newCourse);
      // Fetch courses again to update the list
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
   
  };

  const handleAddLectureClick = (course) => {
    setEditingCourse(course);
    setLectureData({ title: '', videoUrl: '', order: '' });
    setOpenAddLecture(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseAdd = () => setOpenAdd(false);
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
      if (editingCourse) {
        await axios.put(`http://localhost:5000/api/updateCourse/${editingCourse._id}`, form, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post("http://localhost:5000/api/addcourse", form, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      // Refresh course data
      const response = await axios.get("http://localhost:5000/api/getAllCourses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCourses(response.data);
      handleCloseAdd();
      handleCloseEdit();
    } catch (error) {
      console.error("Error submitting form:", error);
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
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    
    if (isConfirmed) {
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
    }
  };
  

  return (
    <div style={{ height: "100vh" }}>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        size="small"
        style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
        onClick={handleAddClick}
      >
        Add Course
      </Button>
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
          <Typography id="edit-course-modal-title" variant="h6" component="h2">
            Edit Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="add-course-modal"
        aria-describedby="add-course-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="add-course-modal-title" variant="h6" component="h2">
            Add Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Submit
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
          <Typography id="add-lecture-modal-title" variant="h6" component="h2">
            Add Lecture
          </Typography>
          <form onSubmit={handleAddLectureSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={lectureData.title}
              onChange={handleLectureChange}
              required
            />
            <TextField
              label="Video URL"
              variant="outlined"
              fullWidth
              margin="normal"
              name="videoUrl"
              value={lectureData.videoUrl}
              onChange={handleLectureChange}
              required
            />
            <TextField
              label="Order"
              variant="outlined"
              fullWidth
              margin="normal"
              name="order"
              type="number"
              value={lectureData.order}
              onChange={handleLectureChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function Course({ course, onEdit, onDelete, onAddLecture }) {
  const navigate = useNavigate();
  const handleViewDetails = () => {
   
    navigate(`/course-details/${course._id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:5000/${course.imageLink}`}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Edit />}
        onClick={onEdit}
      >
       
      </Button>
      <Button
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={() => onDelete(course._id)}
      >
       
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Add />}
        onClick={onAddLecture}
      >
       
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Visibility />}
        onClick={handleViewDetails}
      >
      
      </Button>
    </Card>
  );
}

export default Courses;
