import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ImagePicker } from '@/components/ImagePicker/ImagePicker'
import { PlantForm } from '@/components/PlantForm/PlantForm'
import { usePlants } from '@/hooks/usePlants'
import type { ImageKey, PlantInput } from '@/interfaces/plant'
import './AddPlantPage.css'

const EMPTY_PLANT: PlantInput = {
  name: '',
  room: 'Living Room',
  wateringFrequencyDays: 7,
  wateredToday: false,
  imageKey: null,
}

export function AddPlantPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addPlant } = usePlants()
  const [values, setValues] = useState<PlantInput>(EMPTY_PLANT)

  function handleSubmit(plant: PlantInput) {
    addPlant(plant)
    navigate('/')
  }

  function backToForm() {
    // came from the form → real "back"; opened /add/image directly → replace with /add
    if (location.key !== 'default') navigate(-1)
    else navigate('/add', { replace: true })
  }

  function handleSelectImage(imageKey: ImageKey | null) {
    setValues((prev) => ({ ...prev, imageKey }))
    backToForm()
  }

  return (
    <main className="screen add-plant">
      <Routes>
        <Route
          index
          element={
            <>
              <Link to="/" className="back-link">
                ‹ My Plants
              </Link>
              <h1 className="title">Add plant</h1>
              <PlantForm
                values={values}
                onChange={setValues}
                onChooseImage={() => navigate('/add/image')}
                submitLabel="Save plant"
                onSubmit={handleSubmit}
                onCancel={() => navigate('/')}
              />
            </>
          }
        />
        <Route
          path="image"
          element={
            <ImagePicker
              value={values.imageKey}
              backLabel="Add plant"
              onSelect={handleSelectImage}
              onCancel={backToForm}
            />
          }
        />
        <Route path="*" element={<Navigate to="/add" replace />} />
      </Routes>
    </main>
  )
}
