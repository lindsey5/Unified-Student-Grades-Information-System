import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/admin/Dashboard/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import Departments from './pages/admin/Departments/Departments'
import Courses from './pages/admin/Courses/Courses'
import Students from './pages/admin/Students/Students'
import Student from './pages/admin/Students/Student'
import Subjects from './pages/admin/Subjects/Subjects'
import StudentGrades from './pages/admin/StudentGrades/StudentGrades'
import Instructors from './pages/admin/Instructors/Instructors'
import LoginPage from './pages/auth/loginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='departments' element={<Departments />} />
          <Route path='courses' element={<Courses />} />
          <Route path='students' element={<Students />} />
          <Route path='student/:id' element={<Student />} />
          <Route path='student' element={<Student />}/>
          <Route path='grades/:id' element={<StudentGrades />} />
          <Route path='subjects' element={<Subjects />} />
          <Route path='instructors' element={<Instructors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
