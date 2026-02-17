import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import NewNTrendingPage from '../pages/NewNTrendingPage'
import LastReleasesPage from '../pages/LastReleasesPage'
import VideoGameDetailsPage from '../pages/VideoGameDetailsPage'

import '../App.css'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><NewNTrendingPage /></MainLayout>} />
      <Route path="/ultimos-lanzamientos" element={<MainLayout><LastReleasesPage /></MainLayout>} />
      <Route path="/juego/:id" element={<MainLayout><VideoGameDetailsPage /></MainLayout>} />
    </Routes>
  )
}

export default AppRoutes