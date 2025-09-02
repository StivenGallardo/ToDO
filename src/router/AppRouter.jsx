import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ToDo from '../ToDo';
import AuthRoutes from '../auth/routes/AuthRoutes';
import DashboardRoutes from '../dashboard/routes/DashboardRoutes';
import ProtectedRoute from './ProtectedRoute'; // Importa el componente de ruta protegida
import PublicRoute from './PublicRoute'; // Importa el componente de ruta pública
import { useAuthStore, useUiStore } from '../hooks/';

function AppRouter() {

  const {checkAuthToken} = useAuthStore(); // Obtiene las funciones del store de autenticación
  const {loading} = useUiStore()
  const location = useLocation();

  useEffect(() => {
      checkAuthToken();
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    }
  }, [location]);

  return (
    <>
      {
          loading &&
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <p>Cargando...</p>
          </div>
      }

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

    </>
  );
}

export default AppRouter;