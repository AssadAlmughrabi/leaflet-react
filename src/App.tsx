import { Navigate, Route, Routes } from 'react-router-dom'
import { AddPlantPage } from '@/pages/AddPlantPage/AddPlantPage'
import { EditPlantPage } from '@/pages/EditPlantPage/EditPlantPage'
import { HomePage } from '@/pages/HomePage/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add/*" element={<AddPlantPage />} />
      <Route path="/edit/:id/*" element={<EditPlantPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
