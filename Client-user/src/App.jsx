import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { RecoilRoot } from 'recoil';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ShowCourses from './components/ShowCourses';
import Appbar from './components/Appbar';
import backgroundImg from "/Background.svg"
import Enroll from './components/Enroll';
import EnrolledCourses from './components/EnrolledCourses'
import Lectures from './components/Lectures';
function App() {
  return (
    <RecoilRoot>
      <div 
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          backgroundColor: "black",
          overflow: "auto",
        }}
      >
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element= {<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
         <Route path ="/courses" element = {<ShowCourses />} />
         <Route path ="/enroll/:courseId" element = {<Enroll />} />
         <Route path ="/enrolledCourses" element = {<EnrolledCourses />} />
         <Route path="/lectures/:courseId" element={<Lectures />} />

      </Routes>
    </Router>
    </div>
    </RecoilRoot>
  );
}

export default App;
