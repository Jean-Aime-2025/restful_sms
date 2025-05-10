import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import Students from '@/pages/admin/Students';
import StudentDashboard from '@/pages/student/StudentDashboard';
import { AdminLayout } from './components/layouts/AdminLayout';
import StudentLayout from './components/layouts/StudentLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Admin Section */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminLayout>
              <Students />
            </AdminLayout>
          }
        />

        {/* Student Section */}
        <Route
          path="/student"
          element={
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          }
        />
        {/* Add more student routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
