import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import Departments from './pages/admin/Departments'
import Courses from './pages/admin/Courses'
import Students from './pages/Students'
import Student from './pages/Student'
import Subjects from './pages/admin/Subjects'
import StudentGrades from './pages/StudentGrades'
import Instructors from './pages/admin/Instructors'
import LoginPage from './pages/auth/LoginPage'
import StudentLayout from './layouts/StudentLayout'
import Grades from './pages/student/Grades'
import StudentSecurity from './pages/student/StudentSecurity'
import Admins from './pages/admin/Admins'
import Home from './pages/home/Home'
import CoursesPage from './pages/home/Courses'
import StudentRankings from './pages/student/Rankings'
import Registrars from './pages/admin/Registrars'
import RegistrarLayout from './layouts/RegistrarLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='courses' element={<CoursesPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='departments' element={<Departments />} />
          <Route path='courses' element={<Courses />} />
          <Route path='students' element={<Students role="admin" />} />
          <Route path='student/:id' element={<Student role="admin" />} />
          <Route path='student' element={<Student role="admin" />}/>
          <Route path='grades/:id' element={<StudentGrades />} />
          <Route path='subjects' element={<Subjects />} />
          <Route path='instructors' element={<Instructors />} />
          <Route path='admins' element={<Admins />} />
          <Route path='registrars' element={<Registrars />} />
        </Route>
        <Route path='student' element={<StudentLayout />}>
          <Route index element={<Grades />} />
          <Route path='security' element={<StudentSecurity />} />
          <Route path='ranking' element={<StudentRankings />} />
        </Route>
        <Route path='registrar' element={<RegistrarLayout />}>
          <Route index element={<Dashboard />}/>
          <Route path='students' element={<Students role="registrar" />}/>
          <Route path='student/:id' element={<Student role="registrar" />} />
          <Route path='student' element={<Student role="registrar" />}/>
          <Route path='grades/:id' element={<StudentGrades />} />
          <Route path='subjects' element={<Subjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
