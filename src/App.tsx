import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage/HomePage'
import { PlantPage } from '@/pages/PlantPage/PlantPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add/*" element={<PlantPage />} />
      <Route path="/edit/:id/*" element={<PlantPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
