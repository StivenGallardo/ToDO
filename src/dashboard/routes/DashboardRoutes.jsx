import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'



const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path='/*' element={<Navigate to="/dashboard" />} />
        </Routes>
    )
}

export default DashboardRoutes