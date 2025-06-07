import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ToDo from '../ToDo';
import AuthRoutes from '../auth/routes/AuthRoutes';
import DashboardRoutes from '../dashboard/routes/DashboardRoutes';
import ProtectedRoute from './ProtectedRoute'; // Importa el componente de ruta protegida
import PublicRoute from './PublicRoute'; // Importa el componente de ruta pública
import { useAuthStore } from '../hooks/';

function AppRouter() {

  const {checkAuthToken} = useAuthStore(); // Obtiene las funciones del store de autenticación

    useEffect(() => {
        checkAuthToken();
    }, []);

  return (
    <Routes>
      <Route path="/todo" element={<ToDo />} />
      <Route
        path="/auth/*"
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />
      {/* Agrega más rutas aquí según sea necesario */}
    </Routes>
  );
}

export default AppRouter;