import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import Departments from './pages/admin/Departments/Departments'
import Courses from './pages/admin/Courses/Courses'
import Students from './pages/admin/Students/Students'
import Student from './pages/admin/Students/Student'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<></>} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='departments' element={<Departments />} />
          <Route path='courses' element={<Courses />} />
          <Route path='students' element={<Students />} />
          <Route path='student/:id' element={<Student />} />
          <Route path='student' element={<Student />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
