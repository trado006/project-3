import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Register from "./pages/register/Register";
import LoginMiddleware from "./middleware/LoginMiddleware";
import AdminCourses from './pages/admin-courses/AdminCourses';
import AdminStudents from './pages/admin-students/AdminStudents';
import AdminTeachers from './pages/admin-teachers/AdminTeachers';

import StudentMycourses from './pages/student-mycourses/StudentMycourses';
import TeacherMycourses from './pages/teacher-mycourses/TeacherMycourses';

import Home from './pages/home/Home';
import Test from './pages/test/Test';

export default function App() {
    const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ (user&&user.position=='student')? <Home /> : <Navigate to="/login" /> } />
        <Route path='/login' element={ LoginMiddleware(user? user.position: '') } />
        <Route path="/register" element={<Register />} />

        <Route path="/my-courses" element={ (user&&user.position=='student')? <StudentMycourses /> : <Navigate to='/login' /> } />

        <Route path="/teacher/my-courses" element={ (user&&user.position=='teacher')? <TeacherMycourses /> : <Navigate to='/login' /> } />

        <Route path="/admin/courses" element={ (user&&user.position=='admin')? <AdminCourses /> : <Navigate to='/login' /> } />
        <Route path="/admin/students" element={ (user&&user.position=='admin')? <AdminStudents /> : <Navigate to='/login' /> } />
        <Route path="/admin/teachers" element={ (user&&user.position=='admin')? <AdminTeachers /> : <Navigate to='/login' /> } />
        <Route path="/redirect" element={<Navigate to="/create" />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
