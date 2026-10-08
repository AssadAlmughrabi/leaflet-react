import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ImagePicker } from '@/components/ImagePicker/ImagePicker'
import { PlantForm } from '@/components/PlantForm/PlantForm'
import { usePlants } from '@/hooks/usePlants'
import type { ImageKey, PlantInput } from '@/interfaces/plant'
import './PlantPage.css'

const EMPTY_PLANT: PlantInput = {
  name: '',
  room: 'Living Room',
  wateringFrequencyDays: 7,
  wateredToday: false,
  imageKey: null,
}

export function PlantPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { plants, addPlant, updatePlant } = usePlants()

  // /add → no id → Add mode, /edit/:id → Edit mode
  const isEdit = id !== undefined
  const plant = plants.find((p) => p.id === id)

  const [values, setValues] = useState<PlantInput>(() => {
    if (!plant) return EMPTY_PLANT
    const { id: _id, ...input } = plant
    return input
  })

  // after all hooks: unknown id → go home
  if (isEdit && !plant) return <Navigate to="/" replace />

  const title = isEdit ? 'Edit plant' : 'Add plant'
  const basePath = isEdit ? `/edit/${id}` : '/add'

  function handleSubmit(input: PlantInput) {
    if (plant) updatePlant(plant.id, input)
    else addPlant(input)
    navigate('/')
  }

  function backToForm() {
    // came from the form → real "back"; opened the picker URL directly → replace with the form
    if (location.key !== 'default') navigate(-1)
    else navigate(basePath, { replace: true })
  }

  function handleSelectImage(imageKey: ImageKey | null) {
    setValues((prev) => ({ ...prev, imageKey }))
    backToForm()
  }

  return (
    <main className="screen plant-page">
      <Routes>
        <Route
          index
          element={
            <>
              <Link to="/" className="back-link">
                ‹ My Plants
              </Link>
              <h1 className="title">{title}</h1>
              <PlantForm
                values={values}
                onChange={setValues}
                onChooseImage={() => navigate(`${basePath}/image`)}
                submitLabel={isEdit ? 'Save changes' : 'Save plant'}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/')}
                onDelete={isEdit ? () => {} : undefined}
              />
            </>
          }
        />
        <Route
          path="image"
          element={
            <ImagePicker
              value={values.imageKey}
              backLabel={title}
              onSelect={handleSelectImage}
              onCancel={backToForm}
            />
          }
        />
        <Route path="*" element={<Navigate to={basePath} replace />} />
      </Routes>
    </main>
  )
}
