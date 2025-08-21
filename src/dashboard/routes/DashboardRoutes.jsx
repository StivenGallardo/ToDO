import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import WorkSpace from '../pages/WorkSpacePage'



const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path='/*' element={<Navigate to="/dashboard" />} />
            <Route path="/workspace/:id" element={<WorkSpace />} />
        </Routes>
    )
}

export default DashboardRoutes