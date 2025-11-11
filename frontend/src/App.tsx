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
import LoginPage from './pages/auth/LoginPage'
import StudentLayout from './layouts/StudentLayout'
import Grades from './pages/student/Grades'
import StudentSecurity from './pages/student/StudentSecurity'
import Admins from './pages/admin/Admins/Admins'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<LoginPage />} />
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
          <Route path='admins' element={<Admins />} />
        </Route>
        <Route path='student' element={<StudentLayout />}>
          <Route index element={<Grades />} />
          <Route path='security' element={<StudentSecurity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
