import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Link,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function CourseDetails() {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState('');
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(`http://localhost:5000/api/getCourse/${courseId}`);
        setCourseName(courseResponse.data.title);

        const lecturesResponse = await axios.get(`http://localhost:5000/api/lectures/course/${courseId}`);
        setLectures(lecturesResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEditClick = (lecture) => {
    setSelectedLecture(lecture);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (lecture) => {
    setSelectedLecture(lecture);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteLecture/${selectedLecture._id}`);
      setLectures(lectures.filter((lecture) => lecture._id !== selectedLecture._id));
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const { title, videoUrl, order } = event.target.elements;

    try {
      const response = await axios.put(`http://localhost:5000/api/updateLecture/${selectedLecture._id}`, {
        title: title.value,
        videoUrl: videoUrl.value,
        order: order.value,
      });

      const updatedLecture = response.data.lecture;
      setLectures(lectures.map((lecture) =>
        lecture._id === updatedLecture._id ? updatedLecture : lecture
      ));
      setEditModalOpen(false);
      setSelectedLecture(null);
    } catch (error) {
      console.error("Failed to update lecture:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography 
        variant="h4" 
        component="div" 
        gutterBottom
        style={{ color: 'white' }}
      >
        Lectures for Course: {courseName}
      </Typography>

      <List>
        {lectures.map((lecture) => (
          <ListItem key={lecture._id} style={{ marginBottom: "20px" }}>
            <Card variant="outlined" style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {lecture.title}
                </Typography>
               
                {lecture.videoUrl && (
                  <Typography variant="body2" color="primary">
                    <Link href={lecture.videoUrl} target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </Link>
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEditClick(lecture)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteClick(lecture)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Lecture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the lecture details below.
          </DialogContentText>
          <form onSubmit={handleEditSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              defaultValue={selectedLecture?.title}
            />
            <TextField
              margin="dense"
              name="videoUrl"
              label="Video URL"
              type="url"
              fullWidth
              defaultValue={selectedLecture?.videoUrl}
            />
            <TextField
              margin="dense"
              name="order"
              label="Order"
              type="number"
              fullWidth
              defaultValue={selectedLecture?.order}
            />
            <DialogActions>
              <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this lecture?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CourseDetails;
