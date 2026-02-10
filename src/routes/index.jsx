import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import NewNTrendingPage from '../pages/NewNTrendingPage'

import '../App.css'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><NewNTrendingPage /></MainLayout>} />
    </Routes>
  )
}

export default AppRoutes