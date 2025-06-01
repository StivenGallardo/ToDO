import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDo from '../../ToDo';
import AuthRoutes from '../auth/routes/AuthRoutes';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<ToDo />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
}

export default AppRouter;