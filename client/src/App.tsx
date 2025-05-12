import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import Students from '@/pages/admin/Students';
import StudentDashboard from '@/pages/student/StudentDashboard';
import { AdminLayout } from './components/layouts/AdminLayout';
import StudentLayout from './components/layouts/StudentLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/security/ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Admin Section */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Students />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Student Section */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        {/* Add more student routes here as needed */}
      </Routes>
  );
}

export default App;
