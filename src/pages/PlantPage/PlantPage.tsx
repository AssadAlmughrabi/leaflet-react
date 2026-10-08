import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import trashIcon from '@/assets/icons/trash.svg'
import { ImagePicker } from '@/components/ImagePicker/ImagePicker'
import { Modal } from '@/components/Modal/Modal'
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
  const { plants, addPlant, updatePlant, deletePlant } = usePlants()

  // /add → no id → Add mode, /edit/:id → Edit mode
  const isEdit = id !== undefined
  const plant = plants.find((p) => p.id === id)

  const [values, setValues] = useState<PlantInput>(() => {
    if (!plant) return EMPTY_PLANT
    const { id: _id, ...input } = plant
    return input
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  // after all hooks: unknown id → go home
  if (isEdit && !plant) return <Navigate to="/" replace />

  const title = isEdit ? 'Edit plant' : 'Add plant'
  const basePath = isEdit ? `/edit/${id}` : '/add'

  function handleSubmit(input: PlantInput) {
    if (plant) updatePlant(plant.id, input)
    else addPlant(input)
    navigate('/')
  }

  function handleDelete() {
    if (plant) deletePlant(plant.id)
    navigate('/', { replace: true })
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
                onDelete={isEdit ? () => setConfirmDelete(true) : undefined}
              />
              {confirmDelete && plant && (
                <Modal
                  variant="warning"
                  icon={trashIcon}
                  title={`Delete ${plant.name}?`}
                  cancelLabel="Keep plant"
                  confirmLabel="Delete plant"
                  onCancel={() => setConfirmDelete(false)}
                  onConfirm={handleDelete}
                >
                  <p>This will remove {plant.name} from your list.</p>
                  <p className="modal-warning-text">This can’t be undone.</p>
                </Modal>
              )}
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
