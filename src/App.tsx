import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Route, Routes, Navigate } from 'react-router-dom'
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";

import { ProtectedRoute } from "@/common/components/routing/ProtectedRoute";

import GymsPage from "@/features/gyms/manage-gyms/pages/GymsPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
        <Route path="/gyms" element={<GymsPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard" element={
          <MainLayout title="Panel de Control">
            <DashboardPage />
          </MainLayout>
        } />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
